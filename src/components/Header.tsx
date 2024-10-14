export default function Header() {
  return (
    <div className="flex items-center justify-between gap-1">
      <div className="text-3xl font-bold">Good morning, Zac</div>
      <div className="text-2xl font-extralight">
        {new Date().toLocaleDateString()}
      </div>
    </div>
  );
}
