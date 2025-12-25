import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section48() {
  return (
    <LessonLayout sectionId={48}>
      {/* Introduction */}
      <p>
        <strong>Statistics</strong> is built on linear algebra. Mean, variance, covariance, regression—all
        are matrix operations. Understanding this connection reveals the geometry behind statistical methods.
      </p>

      <h2>Random Vectors</h2>

      <Definition title="Mean Vector" className="my-6">
        <p>
          For a random vector <Math>{`\\mathbf{X} = (X_1, \\ldots, X_n)^T`}</Math>:
        </p>
        <MathBlock>
          {`\\boldsymbol{\\mu} = E[\\mathbf{X}] = \\begin{bmatrix} E[X_1] \\\\ \\vdots \\\\ E[X_n] \\end{bmatrix}`}
        </MathBlock>
      </Definition>

      <Definition title="Covariance Matrix" className="my-6">
        <p>
          The <strong>covariance matrix</strong> captures all pairwise relationships:
        </p>
        <MathBlock>
          {`\\Sigma = E[(\\mathbf{X} - \\boldsymbol{\\mu})(\\mathbf{X} - \\boldsymbol{\\mu})^T]`}
        </MathBlock>
        <MathBlock>
          {`\\Sigma_{ij} = \\text{Cov}(X_i, X_j) = E[(X_i - \\mu_i)(X_j - \\mu_j)]`}
        </MathBlock>
        <p className="mt-2">
          Diagonal: variances. Off-diagonal: covariances.
        </p>
      </Definition>

      <Theorem
        title="Properties of Covariance Matrix"
        className="my-6"
        proof={
          <>
            <p><strong>Symmetric:</strong> <Math>{`\\Sigma_{ij} = \\text{Cov}(X_i, X_j) = E[(X_i - \\mu_i)(X_j - \\mu_j)]`}</Math>.</p>
            <p className="mt-2">Since the product is commutative: <Math>{`\\Sigma_{ij} = \\Sigma_{ji}`}</Math>, so <Math>{`\\Sigma = \\Sigma^T`}</Math>.</p>
            <p className="mt-2"><strong>Positive semidefinite:</strong> For any vector <Math>{`\\mathbf{a}`}</Math>:</p>
            <MathBlock>{`\\mathbf{a}^T\\Sigma\\mathbf{a} = \\mathbf{a}^T E[(\\mathbf{X}-\\boldsymbol{\\mu})(\\mathbf{X}-\\boldsymbol{\\mu})^T]\\mathbf{a} = E[\\mathbf{a}^T(\\mathbf{X}-\\boldsymbol{\\mu})(\\mathbf{X}-\\boldsymbol{\\mu})^T\\mathbf{a}]`}</MathBlock>
            <p className="mt-2">Let <Math>{`Y = \\mathbf{a}^T(\\mathbf{X}-\\boldsymbol{\\mu})`}</Math>. Then <Math>{`\\mathbf{a}^T\\Sigma\\mathbf{a} = E[Y^2] = \\text{Var}(Y) \\geq 0`}</Math>.</p>
          </>
        }
      >
        <p>The covariance matrix <Math>\Sigma</Math> is:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Symmetric:</strong> <Math>\Sigma = \Sigma^T</Math></li>
          <li><strong>Positive semidefinite:</strong> <Math>{`\\mathbf{a}^T\\Sigma\\mathbf{a} \\geq 0`}</Math> for all <Math>{`\\mathbf{a}`}</Math></li>
        </ul>
      </Theorem>

      <h2>Linear Transformations of Random Vectors</h2>

      <Theorem
        title="Transformation of Mean and Covariance"
        className="my-6"
        proof={
          <>
            <p><strong>Mean:</strong> Using linearity of expectation:</p>
            <MathBlock>{`E[\\mathbf{Y}] = E[A\\mathbf{X} + \\mathbf{b}] = AE[\\mathbf{X}] + \\mathbf{b}`}</MathBlock>
            <p className="mt-2"><strong>Covariance:</strong> Let <Math>{`\\boldsymbol{\\mu}_Y = E[\\mathbf{Y}]`}</Math>. Then <Math>{`\\mathbf{Y} - \\boldsymbol{\\mu}_Y = A(\\mathbf{X} - \\boldsymbol{\\mu}_X)`}</Math>.</p>
            <MathBlock>{`\\text{Cov}(\\mathbf{Y}) = E[(\\mathbf{Y} - \\boldsymbol{\\mu}_Y)(\\mathbf{Y} - \\boldsymbol{\\mu}_Y)^T]`}</MathBlock>
            <MathBlock>{`= E[A(\\mathbf{X} - \\boldsymbol{\\mu}_X)(\\mathbf{X} - \\boldsymbol{\\mu}_X)^T A^T] = A\\Sigma_X A^T`}</MathBlock>
          </>
        }
      >
        <p>If <Math>{`\\mathbf{Y} = A\\mathbf{X} + \\mathbf{b}`}</Math>:</p>
        <MathBlock>
          {`E[\\mathbf{Y}] = AE[\\mathbf{X}] + \\mathbf{b}`}
        </MathBlock>
        <MathBlock>
          {`\\text{Cov}(\\mathbf{Y}) = A\\Sigma_X A^T`}
        </MathBlock>
      </Theorem>

      <Example title="Portfolio Variance" className="my-6">
        <p>
          For portfolio return <Math>{`R = w_1R_1 + w_2R_2 = \\mathbf{w}^T\\mathbf{R}`}</Math>:
        </p>
        <MathBlock>
          {`\\text{Var}(R) = \\mathbf{w}^T\\Sigma\\mathbf{w}`}
        </MathBlock>
        <p className="mt-2">
          This is a quadratic form! Minimizing portfolio variance is a linear algebra problem.
        </p>
      </Example>

      <h2>The Multivariate Normal Distribution</h2>

      <Definition title="Multivariate Normal" className="my-6">
        <p>
          <Math>{`\\mathbf{X} \\sim N(\\boldsymbol{\\mu}, \\Sigma)`}</Math> has density:
        </p>
        <MathBlock>
          {`f(\\mathbf{x}) = \\frac{1}{(2\\pi)^{n/2}|\\Sigma|^{1/2}} \\exp\\left(-\\frac{1}{2}(\\mathbf{x}-\\boldsymbol{\\mu})^T\\Sigma^{-1}(\\mathbf{x}-\\boldsymbol{\\mu})\\right)`}
        </MathBlock>
        <p className="mt-2">
          The exponent is a quadratic form with matrix <Math>{`\\Sigma^{-1}`}</Math>.
        </p>
      </Definition>

      <Theorem
        title="Geometry of Multivariate Normal"
        className="my-6"
        proof={
          <>
            <p><strong>Constant density contours:</strong> The density is constant when the exponent <Math>{`(\\mathbf{x}-\\boldsymbol{\\mu})^T\\Sigma^{-1}(\\mathbf{x}-\\boldsymbol{\\mu}) = c^2`}</Math> is constant.</p>
            <p className="mt-2">This is the equation of an ellipsoid centered at <Math>{`\\boldsymbol{\\mu}`}</Math>.</p>
            <p className="mt-2"><strong>Principal axes:</strong> Diagonalize <Math>{`\\Sigma = Q\\Lambda Q^T`}</Math>. In transformed coordinates <Math>{`\\mathbf{y} = Q^T(\\mathbf{x} - \\boldsymbol{\\mu})`}</Math>:</p>
            <MathBlock>{`\\mathbf{y}^T\\Lambda^{-1}\\mathbf{y} = \\sum_i \\frac{y_i^2}{\\lambda_i} = c^2`}</MathBlock>
            <p className="mt-2">This is an axis-aligned ellipsoid with semi-axes <Math>{`c\\sqrt{\\lambda_i}`}</Math>. The eigenvectors of <Math>{`\\Sigma`}</Math> give the principal directions.</p>
          </>
        }
      >
        <p>
          Contours of constant density are ellipsoids. The eigendecomposition <Math>\Sigma = Q\Lambda Q^T</Math>:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Eigenvectors <Math>Q</Math>:</strong> principal axes of the ellipsoid</li>
          <li><strong>Eigenvalues <Math>\Lambda</Math>:</strong> squared semi-axis lengths</li>
        </ul>
      </Theorem>

      <div className="bg-dark-800/50 rounded-xl p-4 my-6 border border-primary-500/20">
        <p className="font-semibold text-primary-400 mb-2">Mahalanobis Distance</p>
        <p className="text-dark-300 text-sm">
          The <strong>Mahalanobis distance</strong> measures how far <Math>{`\\mathbf{x}`}</Math> is from <Math>{`\\boldsymbol{\\mu}`}</Math>,
          accounting for correlation:
        </p>
        <MathBlock>
          {`d^2 = (\\mathbf{x} - \\boldsymbol{\\mu})^T\\Sigma^{-1}(\\mathbf{x} - \\boldsymbol{\\mu})`}
        </MathBlock>
      </div>

      <h2>Sample Statistics</h2>

      <Definition title="Sample Mean and Covariance" className="my-6">
        <p>
          Given data <Math>{`\\mathbf{x}_1, \\ldots, \\mathbf{x}_n`}</Math>:
        </p>
        <MathBlock>
          {`\\bar{\\mathbf{x}} = \\frac{1}{n}\\sum_{i=1}^n \\mathbf{x}_i`}
        </MathBlock>
        <MathBlock>
          {`S = \\frac{1}{n-1}\\sum_{i=1}^n (\\mathbf{x}_i - \\bar{\\mathbf{x}})(\\mathbf{x}_i - \\bar{\\mathbf{x}})^T = \\frac{1}{n-1}X_c^TX_c`}
        </MathBlock>
        <p className="mt-2">
          where <Math>X_c</Math> is the centered data matrix.
        </p>
      </Definition>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>Covariance matrix <Math>\Sigma</Math> is symmetric positive semidefinite.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>Linear transform: <Math>{`\\text{Cov}(A\\mathbf{X}) = A\\Sigma A^T`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>Multivariate normal: ellipsoid contours, axes from eigenvectors.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>Mahalanobis distance uses <Math>{`\\Sigma^{-1}`}</Math> to account for correlation.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">5.</span>
            <span>Sample covariance: <Math>{`S = \\frac{1}{n-1}X_c^TX_c`}</Math>.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
