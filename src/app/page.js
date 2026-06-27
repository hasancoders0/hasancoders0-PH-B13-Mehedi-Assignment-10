export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-10">
      <button className="btn btn-primary">Primary Button</button>

      <button className="btn btn-secondary">Secondary Button</button>

      <button className="btn btn-success">Success Button</button>

      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">DaisyUI Test</h2>
          <p>If buttons are colorful and rounded, DaisyUI works.</p>
        </div>
      </div>
    </main>
  );
}