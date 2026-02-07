export default function HeroCounter({ count }: { count: number }) {
  return (
    <div className="text-center py-8">
      <img src="/mouse-icon.png" alt="" className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-2" />
      <div className="font-[family-name:var(--font-mono)] text-7xl sm:text-8xl text-war-red font-bold animate-count">
        {count}
      </div>
      <div className="text-war-text-dim text-sm uppercase tracking-widest mt-2">
        Confirmed Eliminations
      </div>
    </div>
  );
}
