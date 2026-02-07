import { useTraps } from '../hooks/useTraps';
import { useEliminations } from '../hooks/useEliminations';
import { usePosts } from '../hooks/usePosts';
import HeroCounter from '../components/dashboard/HeroCounter';
import WarStatusBanner from '../components/dashboard/WarStatusBanner';
import CampaignTimer from '../components/dashboard/CampaignTimer';
import QuickStats from '../components/dashboard/QuickStats';
import RecentActivity from '../components/dashboard/RecentActivity';

export default function Dashboard() {
  const { traps, loading: trapsLoading } = useTraps();
  const { eliminations, loading: elimLoading } = useEliminations();
  const { posts, loading: postsLoading } = usePosts();

  const loading = trapsLoading || elimLoading || postsLoading;

  if (loading) {
    return <p className="text-war-text-dim text-center py-12">Initializing command center...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <WarStatusBanner status="ACTIVE" />
        <HeroCounter count={eliminations.length} />
        <CampaignTimer />
      </div>
      <QuickStats traps={traps} lastSightingDate={null} />
      <RecentActivity eliminations={eliminations} posts={posts} traps={traps} />
    </div>
  );
}
