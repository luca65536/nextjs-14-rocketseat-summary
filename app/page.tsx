import { Suspense } from "react";
import { AddTag } from "./add-tag";
import { Tags } from "./tags";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<p>Loading tags...</p>}>
        <Tags />
      </Suspense>
      <AddTag />
    </div>

  );
}
