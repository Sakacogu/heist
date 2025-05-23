import Link from 'next/link';

export const metadata = {
  title: 'Heist - Uppsetning',
};

export default function SetupPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-10 space-y-16">
 
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Plejd</h2>
        <p className="text-gray-700">
          Plejd sérhæfir sig í snjallljósastýringu. Með Bluetooth- og skýja­lausn
          býður Plejd upp á auðvelda uppsetningu án þess að þurfa flókna millistykki.
          Þetta kerfi er frábært til að stjórna ljósmagni, birta­stillingum og
          tímastilli fyrir ljós í heimilinu.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Shelly</h2>
        <p className="text-gray-700">
          Shelly býður upp á breiðari heimstýringarviðmót með Wi-Fi tengingu.
          Með Shelly-græjum getur þú stýrt rofum, tímastilli og mælt hvers kyns
          aflnotkun heimilisins beint í skýið. Shelly virkar frítt sem sjálfstætt
          kerfi eða tengist öðrum kerfum.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Home Assistant</h2>
        <p className="text-gray-700">
          Home Assistant er opinn hugbúnaður fyrir sjálfvirkni heimilisins.
          Það samhæfir óteljandi snjalltæki, meðal annars Plejd og Shelly,
          og býður upp á öflugar reglur, rök og samþættingar (integrations).
          Þetta er „heilaklasi“ kerfisins sem heldur utan um alla snjallheiminn þinn.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">UniFi (Unify)</h2>
        <p className="text-gray-700">
          UniFi tengir snjalltæki í öflugt Wi-Fi net sem tryggir stöðuga tengingu.
          Með UniFi-netkerfi færðu áreiðanlegt Wi-Fi í gegnum allt heimilið,
          forgangsstillingu fyrir Home Assistant og lága latens til allra Plejd
          og Shelly eininga.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Fullkomin samþætting</h2>
        <p className="text-gray-700 leading-relaxed">
          1. <strong>Plejd</strong> sjá um lýsingu og stemningu.<br />
          2. <strong>Shelly</strong> sér um rafmagnsstýringu og mælingu.<br />
          3. <strong>UniFi</strong> tryggir hraðvirkt, áreiðanlegt net.<br />
          4. <strong>Home Assistant</strong> tengir allt saman, býr til sjálfvirkni:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>„Ef sólin sest, dimma ljósið í stofu um 50 %“</li>
          <li>„Ef hiti utan við er undir 5 °C, kveikja á gólf­hitalokunni“</li>
          <li>„Ákveðinn notandi kemur heim → kveikja á gangljósinu“</li>
        </ul>
        <p className="text-gray-700">
          Þannig nýtir Heist styrkleika hvers kerfis til fullkominna heimastillinga.
        </p>
      </section>

      <div className="text-center">
        <Link
          href="/products"
          className="inline-block bg-cyan-600 text-white px-6 py-3 rounded-lg shadow hover:bg-cyan-700 transition"
        >
          Skoða vörur
        </Link>
      </div>
    </main>
  );
}
