import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section28() {
  return (
    <LessonLayout sectionId={28}>
      {/* Introduction */}
      <p>
        <strong>Image processing</strong> is a perfect application of linear algebra. A grayscale image is
        simply a matrix of pixel values, and operations like compression, denoising, and filtering are
        matrix operations.
      </p>

      <h2>Images as Matrices</h2>

      <Definition title="Image Matrix" className="my-6">
        <p>
          A grayscale image with <Math>m</Math> rows and <Math>n</Math> columns is an <Math>m \times n</Math> matrix:
        </p>
        <MathBlock>
          {`A = \\begin{bmatrix} a_{11} & a_{12} & \\cdots & a_{1n} \\\\ a_{21} & a_{22} & \\cdots & a_{2n} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ a_{m1} & a_{m2} & \\cdots & a_{mn} \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          Each entry <Math>{`a_{ij}`}</Math> is a pixel intensity (0 = black, 255 = white for 8-bit images).
        </p>
      </Definition>

      <h2>The Singular Value Decomposition</h2>

      <Theorem
        title="SVD for Images"
        className="my-6"
        proof={
          <>
            <p>The SVD exists for any matrix. The construction uses eigenvalues of <Math>A^TA</Math> and <Math>AA^T</Math>:</p>
            <p className="mt-2"><strong>Step 1:</strong> <Math>A^TA</Math> is symmetric and positive semidefinite, so it has orthonormal eigenvectors <Math>v_i</Math> with eigenvalues <Math>\lambda_i \geq 0</Math>.</p>
            <p className="mt-2"><strong>Step 2:</strong> Define <Math>{`\\sigma_i = \\sqrt{\\lambda_i}`}</Math> and order so <Math>{`\\sigma_1 \\geq \\sigma_2 \\geq \\cdots \\geq 0`}</Math>.</p>
            <p className="mt-2"><strong>Step 3:</strong> For nonzero <Math>\sigma_i</Math>, define <Math>{`u_i = Av_i/\\sigma_i`}</Math>. These are orthonormal since:</p>
            <MathBlock>{`u_i^T u_j = \\frac{(Av_i)^T(Av_j)}{\\sigma_i\\sigma_j} = \\frac{v_i^T A^T A v_j}{\\sigma_i\\sigma_j} = \\frac{\\lambda_j v_i^T v_j}{\\sigma_i\\sigma_j} = \\delta_{ij}`}</MathBlock>
            <p className="mt-2"><strong>Step 4:</strong> Extend <Math>{`\\{u_1, \\ldots, u_r\\}`}</Math> to an orthonormal basis of <Math>{`\\mathbb{R}^m`}</Math>. Then <Math>{`AV = U\\Sigma`}</Math>, giving <Math>{`A = U\\Sigma V^T`}</Math>.</p>
          </>
        }
      >
        <p>
          Any <Math>m \times n</Math> matrix <Math>A</Math> can be factored as:
        </p>
        <MathBlock>
          {`A = U\\Sigma V^T`}
        </MathBlock>
        <p className="mt-2">where:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><Math>U</Math> is <Math>m \times m</Math> orthogonal (left singular vectors)</li>
          <li><Math>\Sigma</Math> is <Math>m \times n</Math> diagonal (singular values <Math>\sigma_1 \geq \sigma_2 \geq \cdots \geq 0</Math>)</li>
          <li><Math>V</Math> is <Math>n \times n</Math> orthogonal (right singular vectors)</li>
        </ul>
      </Theorem>

      <h2>Low-Rank Approximation</h2>

      <Theorem
        title="Eckart-Young Theorem"
        className="my-6"
        proof={
          <>
            <p>We prove this for the Frobenius norm. For any rank-<Math>k</Math> matrix <Math>B</Math>:</p>
            <MathBlock>{`\\|A - B\\|_F^2 = \\sum_{i,j}(a_{ij} - b_{ij})^2`}</MathBlock>
            <p className="mt-2">Using orthogonal invariance of the Frobenius norm and the SVD <Math>{`A = U\\Sigma V^T`}</Math>:</p>
            <MathBlock>{`\\|A - B\\|_F^2 = \\|U^T(A-B)V\\|_F^2 = \\|\\Sigma - U^TBV\\|_F^2`}</MathBlock>
            <p className="mt-2">Let <Math>{`C = U^TBV`}</Math>. Since <Math>B</Math> has rank <Math>k</Math>, so does <Math>C</Math>.</p>
            <p className="mt-2">The minimum <Math>{`\\|\\Sigma - C\\|_F^2`}</Math> over rank-<Math>k</Math> matrices <Math>C</Math> is achieved when <Math>C</Math> keeps the first <Math>k</Math> diagonal entries of <Math>\Sigma</Math> and zeros the rest:</p>
            <MathBlock>{`\\|A - A_k\\|_F^2 = \\sigma_{k+1}^2 + \\cdots + \\sigma_r^2`}</MathBlock>
          </>
        }
      >
        <p>
          The best rank-<Math>k</Math> approximation to <Math>A</Math> uses the first <Math>k</Math> singular values:
        </p>
        <MathBlock>
          {`A_k = \\sum_{i=1}^{k} \\sigma_i \\mathbf{u}_i \\mathbf{v}_i^T`}
        </MathBlock>
        <p className="mt-2">
          This minimizes <Math>\|A - A_k\|</Math> over all rank-<Math>k</Math> matrices.
        </p>
      </Theorem>

      <Example title="Image Compression" className="my-6">
        <p>
          A 1000×1000 image requires 1,000,000 numbers to store.
        </p>
        <p className="mt-2">
          With rank-50 SVD approximation, we store:
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>50 singular values</li>
          <li>50 columns of <Math>U</Math> (50,000 numbers)</li>
          <li>50 columns of <Math>V</Math> (50,000 numbers)</li>
        </ul>
        <p className="mt-2 text-primary-400">
          Total: ~100,000 numbers = 90% compression!
        </p>
      </Example>

      <h2>Sum of Rank-One Matrices</h2>

      <Definition title="Outer Product Form" className="my-6">
        <p>
          The SVD writes <Math>A</Math> as a sum of rank-one matrices:
        </p>
        <MathBlock>
          {`A = \\sigma_1 \\mathbf{u}_1 \\mathbf{v}_1^T + \\sigma_2 \\mathbf{u}_2 \\mathbf{v}_2^T + \\cdots + \\sigma_r \\mathbf{u}_r \\mathbf{v}_r^T`}
        </MathBlock>
        <p className="mt-2">
          Each <Math>{`\\mathbf{u}_i \\mathbf{v}_i^T`}</Math> is an <Math>m \times n</Math> matrix with rank 1.
          The singular values tell us the importance of each component.
        </p>
      </Definition>

      <div className="bg-dark-800/50 rounded-xl p-4 my-6 border border-primary-500/20">
        <p className="font-semibold text-primary-400 mb-2">Image Processing Applications</p>
        <ul className="list-disc list-inside text-dark-300 text-sm space-y-1">
          <li><strong>Compression:</strong> Keep only large singular values</li>
          <li><strong>Denoising:</strong> Small singular values often represent noise</li>
          <li><strong>Face recognition:</strong> "Eigenfaces" from SVD of face images</li>
          <li><strong>Background removal:</strong> Separate foreground from low-rank background</li>
        </ul>
      </div>

      <h2>Computing the SVD</h2>

      <Theorem
        title="SVD from Eigenvalues"
        className="my-6"
        proof={
          <>
            <p>From the SVD <Math>{`A = U\\Sigma V^T`}</Math>, compute <Math>A^TA</Math> and <Math>AA^T</Math>:</p>
            <MathBlock>{`A^TA = (V\\Sigma^T U^T)(U\\Sigma V^T) = V\\Sigma^T\\Sigma V^T`}</MathBlock>
            <p className="mt-2">Since <Math>{`U^TU = I`}</Math>. The matrix <Math>{`\\Sigma^T\\Sigma`}</Math> is diagonal with entries <Math>\\sigma_i^2</Math>.</p>
            <p className="mt-2">Thus <Math>A^TAV = V(\\Sigma^T\\Sigma)</Math>, showing that columns of <Math>V</Math> are eigenvectors of <Math>A^TA</Math> with eigenvalues <Math>\\sigma_i^2</Math>.</p>
            <p className="mt-2">Similarly:</p>
            <MathBlock>{`AA^T = (U\\Sigma V^T)(V\\Sigma^T U^T) = U\\Sigma\\Sigma^T U^T`}</MathBlock>
            <p className="mt-2">So columns of <Math>U</Math> are eigenvectors of <Math>AA^T</Math> with the same eigenvalues <Math>\\sigma_i^2</Math>.</p>
          </>
        }
      >
        <p>The SVD is computed using eigenvalues:</p>
        <ul className="list-disc list-inside space-y-2">
          <li><Math>A^TA = V\Sigma^T\Sigma V^T</Math> — the <Math>v_i</Math> are eigenvectors of <Math>A^TA</Math></li>
          <li><Math>AA^T = U\Sigma\Sigma^T U^T</Math> — the <Math>u_i</Math> are eigenvectors of <Math>AA^T</Math></li>
          <li><Math>{`\\sigma_i = \\sqrt{\\lambda_i}`}</Math> where <Math>\lambda_i</Math> are eigenvalues of <Math>A^TA</Math></li>
        </ul>
      </Theorem>

      <Example title="2×2 SVD" className="my-6">
        <MathBlock>
          {`A = \\begin{bmatrix} 4 & 0 \\\\ 3 & -5 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          <Math>{`A^TA = \\begin{bmatrix} 25 & -15 \\\\\\\\ -15 & 25 \\end{bmatrix}`}</Math>
        </p>
        <p className="mt-2">
          Eigenvalues of <Math>A^TA</Math>: <Math>\lambda_1 = 40</Math>, <Math>\lambda_2 = 10</Math>
        </p>
        <p className="mt-2">
          Singular values: <Math>{`\\sigma_1 = \\sqrt{40} \\approx 6.32`}</Math>, <Math>{`\\sigma_2 = \\sqrt{10} \\approx 3.16`}</Math>
        </p>
      </Example>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>Images are matrices; pixel values are matrix entries.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span><Math>A = U\Sigma V^T</Math> decomposes any matrix into orthogonal and diagonal parts.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>The best rank-<Math>k</Math> approximation uses the <Math>k</Math> largest singular values.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>SVD enables image compression by discarding small singular values.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">5.</span>
            <span>Singular values come from eigenvalues of <Math>A^TA</Math>.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
