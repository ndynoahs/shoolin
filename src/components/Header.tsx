import { Link } from 'react-router-dom'
import { PrefetchLink } from '../utils/preload'

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex gap-4">
        <PrefetchLink to="/" preload={() => import('../pages/Home')}>Home</PrefetchLink>
        <PrefetchLink to="/dashboard" preload={() => import('../pages/Dashboard')}>Dashboard</PrefetchLink>
        <PrefetchLink to="/settings" preload={() => import('../pages/Settings')}>Settings</PrefetchLink>



      </nav>
    </header>
  )
}
