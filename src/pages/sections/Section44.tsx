import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section44() {
  return (
    <LessonLayout sectionId={44}>
      {/* Introduction */}
      <p>
        Linear algebra provides powerful tools for <strong>cryptography</strong>. Matrix operations
        over finite fields enable encryption, and coding theory uses linear algebra for error correction.
      </p>

      <h2>Modular Arithmetic</h2>

      <Definition title="Finite Fields" className="my-6">
        <p>
          In cryptography, we work modulo a prime <Math>p</Math>:
        </p>
        <MathBlock>
          {`\\mathbb{Z}_p = \\{0, 1, 2, \\ldots, p-1\\}`}
        </MathBlock>
        <p className="mt-2">
          All operations are performed mod <Math>p</Math>. Every nonzero element has an inverse.
        </p>
      </Definition>

      <Example title="Arithmetic in Z₇" className="my-6">
        <p>In <Math>{`\\mathbb{Z}_7`}</Math>:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><Math>{`3 + 5 = 8 \\equiv 1 \\pmod{7}`}</Math></li>
          <li><Math>{`3 \\times 5 = 15 \\equiv 1 \\pmod{7}`}</Math></li>
          <li><Math>{`3^{-1} = 5`}</Math> (since <Math>3 \times 5 = 1</Math>)</li>
        </ul>
      </Example>

      <h2>Hill Cipher</h2>

      <Definition title="Hill Cipher" className="my-6">
        <p>
          Encrypt using an invertible matrix <Math>K</Math> over <Math>{`\\mathbb{Z}_{26}`}</Math>:
        </p>
        <MathBlock>
          {`\\mathbf{c} = K\\mathbf{m} \\pmod{26}`}
        </MathBlock>
        <p className="mt-2">
          <Math>{`\\mathbf{m}`}</Math> = message (letters as numbers 0-25)<br />
          <Math>{`\\mathbf{c}`}</Math> = ciphertext<br />
          Decrypt: <Math>{`\\mathbf{m} = K^{-1}\\mathbf{c}`}</Math>
        </p>
      </Definition>

      <Example title="2×2 Hill Cipher" className="my-6">
        <p>Key matrix (mod 26):</p>
        <MathBlock>
          {`K = \\begin{bmatrix} 3 & 2 \\\\ 5 & 7 \\end{bmatrix}, \\quad K^{-1} = \\begin{bmatrix} 7 & 24 \\\\ 15 & 17 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          Encrypt "HI" = (7, 8): <Math>K(7, 8)^T = (37, 91)^T \equiv (11, 13)^T</Math> = "LN"
        </p>
      </Example>

      <h2>Error-Correcting Codes</h2>

      <Definition title="Linear Code" className="my-6">
        <p>
          A <strong>linear code</strong> is a subspace of <Math>{`\\mathbb{Z}_2^n`}</Math>.
          Encode message <Math>{`\\mathbf{m}`}</Math> using generator matrix <Math>G</Math>:
        </p>
        <MathBlock>
          {`\\mathbf{c} = G\\mathbf{m}`}
        </MathBlock>
        <p className="mt-2">
          The code adds redundancy to detect and correct errors.
        </p>
      </Definition>

      <Example title="Hamming (7,4) Code" className="my-6">
        <p>
          Encodes 4 data bits as 7 bits (3 parity bits):
        </p>
        <MathBlock>
          {`G = \\begin{bmatrix} 1 & 0 & 0 & 0 \\\\ 0 & 1 & 0 & 0 \\\\ 0 & 0 & 1 & 0 \\\\ 0 & 0 & 0 & 1 \\\\ 1 & 1 & 0 & 1 \\\\ 1 & 0 & 1 & 1 \\\\ 0 & 1 & 1 & 1 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          Can correct any single-bit error!
        </p>
      </Example>

      <Theorem
        title="Parity Check Matrix"
        className="my-6"
        proof={
          <>
            <p><strong>Definition:</strong> The parity check matrix <Math>H</Math> satisfies <Math>HG = 0</Math> where <Math>G</Math> is the generator matrix.</p>
            <p className="mt-2"><strong>Valid codewords:</strong> If <Math>{`\\mathbf{c} = G\\mathbf{m}`}</Math> is a valid codeword, then <Math>{`H\\mathbf{c} = HG\\mathbf{m} = \\mathbf{0}`}</Math>.</p>
            <p className="mt-2"><strong>Error detection:</strong> Received word <Math>{`\\mathbf{r} = \\mathbf{c} + \\mathbf{e}`}</Math> where <Math>{`\\mathbf{e}`}</Math> is the error pattern.</p>
            <MathBlock>{`H\\mathbf{r} = H(\\mathbf{c} + \\mathbf{e}) = H\\mathbf{c} + H\\mathbf{e} = \\mathbf{0} + H\\mathbf{e} = H\\mathbf{e}`}</MathBlock>
            <p className="mt-2">The <strong>syndrome</strong> <Math>{`H\\mathbf{r}`}</Math> depends only on the error pattern, not the message. If <Math>{`\\mathbf{e}`}</Math> is a single bit error in position <Math>{`j`}</Math>, then <Math>{`H\\mathbf{e}`}</Math> equals column <Math>{`j`}</Math> of <Math>{`H`}</Math>, identifying the error location.</p>
          </>
        }
      >
        <p>
          The <strong>parity check matrix</strong> <Math>H</Math> detects errors:
        </p>
        <MathBlock>
          {`H\\mathbf{c} = \\mathbf{0} \\quad \\text{if no error}`}
        </MathBlock>
        <p className="mt-2">
          If <Math>{`H\\mathbf{r} \\neq \\mathbf{0}`}</Math>, the syndrome tells us which bit is wrong.
        </p>
      </Theorem>

      <h2>Modern Cryptography</h2>

      <div className="bg-dark-800/50 rounded-xl p-4 my-6 border border-primary-500/20">
        <p className="font-semibold text-primary-400 mb-2">Linear Algebra in Modern Crypto</p>
        <ul className="list-disc list-inside text-dark-300 text-sm space-y-1">
          <li><strong>RSA:</strong> Matrix operations over <Math>{`\\mathbb{Z}_n`}</Math></li>
          <li><strong>Elliptic curves:</strong> Points form a group, arithmetic uses linear algebra</li>
          <li><strong>Lattice cryptography:</strong> Hard lattice problems (LWE, SIS)</li>
          <li><strong>Post-quantum:</strong> Code-based and lattice-based systems</li>
        </ul>
      </div>

      <h2>Lattice Problems</h2>

      <Definition title="Learning With Errors (LWE)" className="my-6">
        <p>
          Given <Math>{`A\\mathbf{s} + \\mathbf{e} \\approx \\mathbf{b}`}</Math> where <Math>{`\\mathbf{e}`}</Math> is small noise,
          find <Math>{`\\mathbf{s}`}</Math>.
        </p>
        <p className="mt-2">
          This is believed to be hard even for quantum computers, forming the basis of
          <strong> post-quantum cryptography</strong>.
        </p>
      </Definition>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>Cryptography uses linear algebra over finite fields <Math>{`\\mathbb{Z}_p`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>Hill cipher: <Math>{`\\mathbf{c} = K\\mathbf{m}`}</Math>, decrypt with <Math>{`K^{-1}`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>Linear codes: subspaces that add redundancy for error correction.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>Parity check matrix <Math>H</Math>: <Math>{`H\\mathbf{c} = 0`}</Math> detects errors.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">5.</span>
            <span>Lattice-based crypto (LWE) is quantum-resistant.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
