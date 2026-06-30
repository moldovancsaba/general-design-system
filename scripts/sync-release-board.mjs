import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const OWNER = process.env.GDS_PROJECT_OWNER ?? 'sovereignsquad';
const REPO = process.env.GDS_PROJECT_REPO ?? 'general-design-system';
const PROJECT_NUMBER = process.env.GDS_PROJECT_NUMBER ?? '11';
const DONE_STATUS_NAME = process.env.GDS_PROJECT_DONE_STATUS ?? 'Done';
const dryRun = process.env.GDS_RELEASE_BOARD_DRY_RUN === '1';
const version = process.env.GDS_RELEASE_VERSION ?? readFileSync(resolve(process.cwd(), 'VERSION'), 'utf8').trim();
const deliveredIssues = (process.env.GDS_RELEASE_DELIVERED_ISSUES ?? '')
  .split(',')
  .map((value) => Number.parseInt(value.trim().replace(/^#/, ''), 10))
  .filter(Number.isInteger);

function gh(args) {
  return execFileSync('gh', args, {
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 20,
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}

function parseJson(args) {
  const output = gh(args);
  return output ? JSON.parse(output) : {};
}

function assertGraphqlCapacity() {
  const rateLimit = parseJson(['api', 'rate_limit']);
  const remaining = rateLimit.resources?.graphql?.remaining ?? 0;
  const reset = rateLimit.resources?.graphql?.reset;

  if (remaining < 20) {
    const resetDate = reset ? new Date(reset * 1000).toISOString() : 'unknown';
    throw new Error(`GitHub GraphQL capacity is too low for release board sync. Remaining: ${remaining}. Retry after ${resetDate}.`);
  }
}

function getProjectConfig() {
  const project = parseJson(['project', 'view', PROJECT_NUMBER, '--owner', OWNER, '--format', 'json']);
  const fields = parseJson(['project', 'field-list', PROJECT_NUMBER, '--owner', OWNER, '--format', 'json']).fields ?? [];
  const statusField = fields.find((field) => field.name === 'Status');
  const doneOption = statusField?.options?.find((option) => option.name === DONE_STATUS_NAME);

  if (!project.id || !statusField?.id || !doneOption?.id) {
    throw new Error(`Could not resolve project ${OWNER}#${PROJECT_NUMBER} status field and "${DONE_STATUS_NAME}" option.`);
  }

  return {
    projectId: project.id,
    statusFieldId: statusField.id,
    doneOptionId: doneOption.id,
  };
}

function getProjectItems() {
  return parseJson(['project', 'item-list', PROJECT_NUMBER, '--owner', OWNER, '--limit', '300', '--format', 'json']).items ?? [];
}

function getIssueStates() {
  const openIssues = parseJson(['issue', 'list', '--repo', `${OWNER}/${REPO}`, '--state', 'open', '--limit', '1000', '--json', 'number,state']);
  const closedIssues = parseJson(['issue', 'list', '--repo', `${OWNER}/${REPO}`, '--state', 'closed', '--limit', '1000', '--json', 'number,state']);
  return new Map([...openIssues, ...closedIssues].map((issue) => [issue.number, issue.state]));
}

function closeDeliveredIssues() {
  for (const issueNumber of deliveredIssues) {
    const issue = parseJson(['issue', 'view', String(issueNumber), '--repo', `${OWNER}/${REPO}`, '--json', 'state']);
    if (issue.state === 'CLOSED') {
      console.log(`#${issueNumber} is already closed`);
      continue;
    }

    const comment = `Delivered in GDS ${version}. Release board sync will move this issue to ${DONE_STATUS_NAME}.`;
    if (dryRun) {
      console.log(`[dry-run] would close #${issueNumber}`);
      continue;
    }

    gh(['issue', 'close', String(issueNumber), '--repo', `${OWNER}/${REPO}`, '--comment', comment]);
    console.log(`#${issueNumber} closed for GDS ${version}`);
  }
}

function addProjectItem(issueNumber) {
  const issueUrl = `https://github.com/${OWNER}/${REPO}/issues/${issueNumber}`;
  if (dryRun) {
    console.log(`[dry-run] would add #${issueNumber} to project ${OWNER}#${PROJECT_NUMBER}`);
    return undefined;
  }

  const result = parseJson(['project', 'item-add', PROJECT_NUMBER, '--owner', OWNER, '--url', issueUrl, '--format', 'json']);
  return result.id ? { id: result.id, content: { number: issueNumber }, status: 'UNKNOWN' } : undefined;
}

function markDone(item, config) {
  const issueNumber = item.content?.number;
  if (dryRun) {
    console.log(`[dry-run] would mark #${issueNumber} as ${DONE_STATUS_NAME}`);
    return;
  }

  gh([
    'project',
    'item-edit',
    '--id',
    item.id,
    '--project-id',
    config.projectId,
    '--field-id',
    config.statusFieldId,
    '--single-select-option-id',
    config.doneOptionId,
  ]);

  console.log(`#${issueNumber} -> ${DONE_STATUS_NAME}`);
}

function main() {
  assertGraphqlCapacity();
  const config = getProjectConfig();

  if (deliveredIssues.length > 0) {
    closeDeliveredIssues();
  }

  let items = getProjectItems();
  let issueStates = getIssueStates();

  for (const issueNumber of deliveredIssues) {
    if (!items.some((item) => item.content?.number === issueNumber)) {
      const added = addProjectItem(issueNumber);
      if (added) {
        items = getProjectItems();
      }
    }
  }

  if (deliveredIssues.length > 0) {
    issueStates = getIssueStates();
  }

  const issueItems = items.filter((item) => Number.isInteger(item.content?.number));
  const syncTargets = issueItems.filter((item) =>
    issueStates.get(item.content.number) === 'CLOSED' && item.status !== DONE_STATUS_NAME,
  );

  for (const item of syncTargets) {
    markDone(item, config);
  }

  console.log(`Release board sync inspected ${issueItems.length} issue item(s).`);
  console.log(`Release board sync updated ${syncTargets.length} item(s).`);
}

main();
