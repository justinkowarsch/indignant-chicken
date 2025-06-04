// components/SludgeProcedureDoc.jsx
export default function SludgeProcedureDoc() {
  return (
    <div className="pdf-look border p-6 bg-white shadow-lg rounded max-w-3xl mx-auto text-sm leading-relaxed font-serif">
      <h1 className="text-xl font-bold text-center underline mb-4">
        Official Unofficial Procedure for Complying With the Official Project
        Initiation Procedure (Rev 0.93b)
      </h1>

      <section className="mb-4">
        <h2 className="font-bold">Step 1: Pre-Pre-Approval Coordination</h2>
        <p>
          Before initiating a project, confirm with Karen that you are{" "}
          <em>thinking about</em> initiating a project. Use Form PPI-01:
          "Declaration of Intent to Potentially Submit a Future Form." Must be
          signed in blue ink and scanned upside-down.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="font-bold">Step 2: Initiation of Form Request Form</h2>
        <p>
          To request the form needed to initiate the project, submit a{" "}
          <strong>Form Request Form (FRF)</strong>. Do not use the actual
          initiation form prematurely. That’s initiative. We don’t reward that
          here. Karen will evaluate your tone before issuing the real form.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="font-bold">Step 3: Perform the Ritual</h2>
        <p>
          Schedule a 15-minute Teams meeting with Karen. She won’t attend. This
          is symbolic. Like a corporate séance. Take notes. Nothing is said, but
          it’s important that you’re seen <em>trying</em>.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="font-bold">
          Step 4: Fill Out the Form (But Not Really)
        </h2>
        <p>
          You’ll be given a PDF with 47 fields, 6 of which contradict each
          other. Important fields include:
          <ul className="list-disc list-inside ml-4">
            <li>The client’s astrological sign</li>
            <li>The budget Karen believes you should have</li>
            <li>
              The Project Title (Format: [Client Initials] – [Vision Statement]
              – [2025 Rev3 Aspirational Placeholder])
            </li>
          </ul>
        </p>
      </section>

      <section className="mb-4">
        <h2 className="font-bold">Step 5: Submit to The System</h2>
        <p>
          You will enter 3 fields in the app. This is fine. Karen will
          immediately overwrite them “for consistency.” Then she’ll email you
          asking why you didn’t follow the form.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="font-bold">Step 6: Apologize</h2>
        <p>
          Privately and sincerely acknowledge that you were wrong. Karen was
          right. Karen is always right. Your calendar will automatically
          schedule a <strong>Form Review Reflection Session</strong>. BYOF
          (Bring Your Own Form).
        </p>
      </section>

      <section className="mt-6 italic text-xs text-gray-500 border-t pt-4">
        <p>
          This document does not officially exist. Do not cite it in meetings.
          Karen will deny it. She wrote it.
        </p>
      </section>
    </div>
  );
}
