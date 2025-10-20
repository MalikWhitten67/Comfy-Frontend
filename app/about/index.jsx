import SharedComponent from "../../src/Components/SharedComponent";
export default function Page() {
  return (
    <SharedComponent
      title={"About Comfy"}
      description={
        "Comfy - One of One. Crafted for individuality, comfort, and conscious design."
      }
    >
      <div className="min-h-screen bg-background pt-24 px-4">
        <main className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-6 tracking-tight">
            The Comfy Story
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-12">
            <span className="font-semibold">Comfy</span> was built on the idea that 
            individuality shouldn’t come at a cost. We craft pieces that reflect 
            authenticity — “one of one” — made to feel personal, timeless, and 
            accessible to everyone.
          </p>

          <section className="space-y-10 text-left">
            <div>
              <h2 className="text-2xl font-semibold mb-3">Our Philosophy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We don’t follow fast fashion or seasonal noise. Each Comfy piece 
                embodies simplicity, comfort, and intention — made for those who 
                value self-expression through subtle, distinct design.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Quality That’s Accessible</h2>
              <p className="text-muted-foreground leading-relaxed">
                Comfort and quality should be universal. That’s why we source 
                <span className="font-medium"> high-quality, low-cost materials</span> 
                &nbsp;that feel premium without the markup. Our goal is to make 
                thoughtfully made clothing affordable for everyone — because 
                true style shouldn’t be exclusive.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Sustainability in Motion</h2>
              <p className="text-muted-foreground leading-relaxed">
                Comfy is committed to minimizing its footprint. From 
                low-emission production methods to efficient shipping and 
                responsible sourcing, we prioritize the planet in every step. 
                Every garment is made to last — reducing waste while keeping you 
                feeling good inside and out.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">One of One</h2>
              <p className="text-muted-foreground leading-relaxed">
                Each release is limited and crafted with purpose — a reflection 
                of individuality that can’t be replicated. To wear Comfy is to 
                wear something made just for you.
              </p>
            </div>
          </section>

          <div className="mt-16">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Comfy — Affordable. Sustainable. One of One.
            </p>
          </div>
        </main>
      </div>
    </SharedComponent>
  );
}
