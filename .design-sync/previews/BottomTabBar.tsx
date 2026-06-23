import { BottomTabBar } from '@doneisbetter/gds-core';
import { IconHome, IconSearch, IconPlus, IconMessage, IconUser } from '@tabler/icons-react';

export default function Preview() {
  return (
    <div style={{ position: 'relative', height: 120, border: '1px solid #eee', borderRadius: 12, overflow: 'hidden', background: '#f9f9f9' }}>
      <BottomTabBar
        items={[
          { id: 'home',   href: '#', label: 'Home',    icon: <IconHome size={22} /> },
          { id: 'search', href: '#', label: 'Explore', icon: <IconSearch size={22} /> },
          { id: 'post',   href: '#', label: 'Post',    icon: <IconPlus size={22} /> },
          { id: 'inbox',  href: '#', label: 'Inbox',   icon: <IconMessage size={22} /> },
          { id: 'me',     href: '#', label: 'Me',      icon: <IconUser size={22} /> },
        ]}
        activeId="home"
        emphasizedItemId="post"
      />
    </div>
  );
}
