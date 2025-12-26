import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section30() {
  return (
    <LessonLayout sectionId={30}>
      {/* Introduction */}
      <p>
        <strong>Principal Component Analysis (PCA)</strong> is one of the most important applications of
        the SVD. It finds the directions of maximum variance in data, enabling dimensionality reduction.
      </p>

      <h2>The Data Matrix</h2>

      <Definition title="Centered Data Matrix" className="my-6">
        <p>
          Given <Math>n</Math> data points in <Math>{`\\mathbb{R}^m`}</Math>, form the data matrix:
        </p>
        <MathBlock>
          {`A = \\begin{bmatrix} | & | & & | \\\\ \\mathbf{a}_1 & \\mathbf{a}_2 & \\cdots & \\mathbf{a}_n \\\\ | & | & & | \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          <strong>Center the data</strong> by subtracting the mean from each column:
        </p>
        <MathBlock>
          {`\\bar{\\mathbf{a}} = \\frac{1}{n}(\\mathbf{a}_1 + \\cdots + \\mathbf{a}_n)`}
        </MathBlock>
      </Definition>

      <h2>Covariance and Variance</h2>

      <Definition title="Sample Covariance Matrix" className="my-6">
        <p>
          For centered data, the <strong>sample covariance matrix</strong> is:
        </p>
        <MathBlock>
          {`S = \\frac{1}{n-1}AA^T`}
        </MathBlock>
        <p className="mt-2">
          <Math>{`S_{ij}`}</Math> measures how variables <Math>i</Math> and <Math>j</Math> vary together.
          Diagonal entries are variances.
        </p>
      </Definition>

      <h2>Principal Components</h2>

      <Theorem
        title="Principal Component Analysis"
        className="my-6"
        proof={
          <>
            <p>The variance of centered data projected onto unit vector <Math>q</Math> is:</p>
            <MathBlock>{`\\text{Var}_q = \\frac{1}{n-1}\\sum_{i=1}^n (q^T a_i)^2 = \\frac{1}{n-1}q^T A A^T q = q^T S q`}</MathBlock>
            <p className="mt-2">To maximize variance subject to <Math>\\|q\\| = 1</Math>, use Lagrange multipliers:</p>
            <MathBlock>{`\\nabla(q^T S q - \\lambda(q^T q - 1)) = 0 \\implies 2Sq = 2\\lambda q`}</MathBlock>
            <p className="mt-2">So the maximum variance is achieved at eigenvectors of <Math>S</Math>. The eigenvalue <Math>\\lambda</Math> equals the variance: <Math>q^T S q = q^T (\\lambda q) = \\lambda</Math>.</p>
            <p className="mt-2">The largest eigenvalue <Math>\\lambda_1</Math> gives maximum variance with eigenvector <Math>q_1</Math>. The second PC <Math>q_2</Math> is orthogonal to <Math>q_1</Math> (since eigenvectors of symmetric matrices are orthogonal) and maximizes variance in the orthogonal complement.</p>
          </>
        }
      >
        <p>
          The <strong>principal components</strong> are the eigenvectors of the covariance matrix <Math>S</Math>:
        </p>
        <MathBlock>
          {`S = Q\\Lambda Q^T`}
        </MathBlock>
        <ul className="list-disc list-inside mt-2 space-y-2">
          <li>The first PC <Math>q_1</Math> points in the direction of maximum variance</li>
          <li>The second PC <Math>q_2</Math> is orthogonal to <Math>q_1</Math> with next-highest variance</li>
          <li>Eigenvalue <Math>\lambda_i</Math> = variance in direction <Math>q_i</Math></li>
        </ul>
      </Theorem>

      <Example title="2D Data Example" className="my-6">
        <p>
          For data scattered in an elliptical pattern:
        </p>
        <ul className="list-disc list-inside mt-2">
          <li><strong>First PC:</strong> direction along the long axis of the ellipse</li>
          <li><strong>Second PC:</strong> perpendicular, along the short axis</li>
          <li>The ratio <Math>\lambda_1/\lambda_2</Math> tells how elongated the ellipse is</li>
        </ul>
      </Example>

      <h2>PCA via SVD</h2>

      <Theorem
        title="PCA from the SVD"
        className="my-6"
        proof={
          <>
            <p>Given <Math>{`A = U\\Sigma V^T`}</Math>, the covariance matrix is:</p>
            <MathBlock>{`S = \\frac{1}{n-1}AA^T = \\frac{1}{n-1}U\\Sigma V^T V \\Sigma^T U^T = \\frac{1}{n-1}U(\\Sigma\\Sigma^T)U^T`}</MathBlock>
            <p className="mt-2">This is a spectral decomposition: columns of <Math>U</Math> are eigenvectors of <Math>S</Math>, with eigenvalues <Math>{`\\lambda_i = \\sigma_i^2/(n-1)`}</Math>.</p>
            <p className="mt-2">For the projected coordinates, if we project data point <Math>a_i</Math> onto PC <Math>u_j</Math>:</p>
            <MathBlock>{`\\text{score}_{ij} = u_j^T a_i`}</MathBlock>
            <p className="mt-2">In matrix form: <Math>{`U^T A = U^T U \\Sigma V^T = \\Sigma V^T`}</Math>. So the matrix of scores is <Math>{`\\Sigma V^T`}</Math>.</p>
          </>
        }
      >
        <p>
          If <Math>A = U\Sigma V^T</Math> is the SVD of the centered data matrix:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Principal components are the columns of <Math>U</Math></li>
          <li>Singular values relate to eigenvalues: <Math>\lambda_i = \sigma_i^2/(n-1)</Math></li>
          <li>The coordinates in the new basis are <Math>\Sigma V^T</Math></li>
        </ul>
        <p className="mt-2 text-primary-400">
          PCA via SVD is numerically more stable than eigendecomposition.
        </p>
      </Theorem>

      <h2>Dimensionality Reduction</h2>

      <Definition title="Low-Dimensional Projection" className="my-6">
        <p>
          To reduce from <Math>m</Math> dimensions to <Math>k</Math>:
        </p>
        <MathBlock>
          {`\\mathbf{y} = Q_k^T \\mathbf{x}`}
        </MathBlock>
        <p className="mt-2">
          where <Math>Q_k</Math> contains the first <Math>k</Math> principal components.
          The <strong>reconstruction</strong> is <Math>{`\\hat{\\mathbf{x}} = Q_k \\mathbf{y}`}</Math>.
        </p>
      </Definition>

      <Theorem
        title="Optimal Low-Rank Approximation"
        className="my-6"
        proof={
          <>
            <p>The total variance equals the sum of all eigenvalues:</p>
            <MathBlock>{`\\text{Total variance} = \\text{tr}(S) = \\lambda_1 + \\cdots + \\lambda_m`}</MathBlock>
            <p className="mt-2">When we project onto the first <Math>k</Math> PCs, the reconstruction is:</p>
            <MathBlock>{`\\hat{A} = Q_k Q_k^T A`}</MathBlock>
            <p className="mt-2">By the Eckart-Young theorem, this minimizes <Math>{`\\|A - \\hat{A}\\|_F^2`}</Math>.</p>
            <p className="mt-2">The variance captured by the first <Math>k</Math> components is <Math>{`\\lambda_1 + \\cdots + \\lambda_k`}</Math>. The reconstruction error in variance is <Math>{`\\lambda_{k+1} + \\cdots + \\lambda_m`}</Math>.</p>
            <p className="mt-2">Thus the fraction of variance retained is:</p>
            <MathBlock>{`\\frac{\\lambda_1 + \\cdots + \\lambda_k}{\\lambda_1 + \\cdots + \\lambda_m} = \\frac{\\sigma_1^2 + \\cdots + \\sigma_k^2}{\\sigma_1^2 + \\cdots + \\sigma_m^2}`}</MathBlock>
          </>
        }
      >
        <p>
          The first <Math>k</Math> principal components give the best <Math>k</Math>-dimensional
          representation of the data (in the least-squares sense).
        </p>
        <MathBlock>
          {`\\text{Fraction of variance retained} = \\frac{\\lambda_1 + \\cdots + \\lambda_k}{\\lambda_1 + \\cdots + \\lambda_m}`}
        </MathBlock>
      </Theorem>

      <div className="bg-dark-800/50 rounded-xl p-4 my-6 border border-primary-500/20">
        <p className="font-semibold text-primary-400 mb-2">PCA Applications</p>
        <ul className="list-disc list-inside text-dark-300 text-sm space-y-1">
          <li><strong>Image recognition:</strong> Eigenfaces for face recognition</li>
          <li><strong>Gene expression:</strong> Find patterns in high-dimensional gene data</li>
          <li><strong>Finance:</strong> Identify factors driving stock returns</li>
          <li><strong>Visualization:</strong> Project high-dimensional data to 2D or 3D</li>
        </ul>
      </div>

      <Example title="Image Compression with PCA" className="my-6">
        <p>
          Treat each image as a vector. For 1000 face images (64×64 pixels = 4096 dimensions):
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>Stack images as columns: 4096 × 1000 matrix</li>
          <li>Find principal components (eigenfaces)</li>
          <li>First 50-100 components capture most variation</li>
          <li>Represent each face as 50-100 numbers instead of 4096</li>
        </ul>
      </Example>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>PCA finds orthogonal directions of maximum variance.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>Principal components are eigenvectors of the covariance matrix.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>Compute PCA via SVD: <Math>A = U\Sigma V^T</Math>, PCs are columns of <Math>U</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>Reduce dimensions by keeping only the first <Math>k</Math> components.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">5.</span>
            <span>Eigenvalues measure variance; sum of retained eigenvalues = variance explained.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
