import type { Metadata } from 'next';

import Users from './components/users';

export const metadata: Metadata = {
  title: 'Main',
};

export default function MainPage() {
  return <Users />;
}
