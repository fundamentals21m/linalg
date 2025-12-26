import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section50() {
  return (
    <LessonLayout sectionId={50}>
      {/* Introduction */}
      <p>
        <strong>Machine learning</strong> is applied linear algebra. Neural networks, support vector machines,
        and dimensionality reduction all rely on matrix operations. This final section connects the course
        to modern data science.
      </p>

      <h2>Dimensionality Reduction</h2>

      <Theorem
        title="PCA Revisited"
        className="my-6"
        proof={
          <>
            <p><strong>Goal:</strong> Find directions of maximum variance. The variance along direction <Math>{`\\mathbf{v}`}</Math> (unit vector) is <Math>{`\\mathbf{v}^T \\Sigma \\mathbf{v}`}</Math> where <Math>{`\\Sigma`}</Math> is the covariance matrix.</p>
            <p className="mt-2"><strong>Solution:</strong> Maximize <Math>{`\\mathbf{v}^T \\Sigma \\mathbf{v}`}</Math> subject to <Math>{`\\|\\mathbf{v}\\| = 1`}</Math>. By Lagrange multipliers, <Math>{`\\Sigma \\mathbf{v} = \\lambda \\mathbf{v}`}</Math>.</p>
            <p className="mt-2">The principal components are eigenvectors of <Math>\\Sigma</Math>. The variance along each is its eigenvalue.</p>
            <p className="mt-2"><strong>SVD connection:</strong> For centered data <Math>X</Math>, <Math>\\Sigma \\propto X^TX</Math>. The SVD <Math>X = U\\Sigma V^T</Math> gives the same principal directions in <Math>V</Math>.</p>
          </>
        }
      >
        <p>
          <strong>Principal Component Analysis</strong> projects high-dimensional data to lower dimensions:
        </p>
        <MathBlock>
          {`X = U\\Sigma V^T \\quad \\Rightarrow \\quad X_k = U_k\\Sigma_k V_k^T`}
        </MathBlock>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Keep only <Math>k</Math> largest singular values</li>
          <li>Minimizes reconstruction error <Math>\|X - X_k\|_F</Math></li>
          <li>New coordinates: <Math>Z = XV_k = U_k\Sigma_k</Math></li>
        </ul>
      </Theorem>

      <h2>Linear Classifiers</h2>

      <Definition title="Linear Classification" className="my-6">
        <p>
          Find a hyperplane <Math>{`\\mathbf{w}^T\\mathbf{x} + b = 0`}</Math> that separates two classes:
        </p>
        <MathBlock>
          {`\\text{Predict class } +1 \\text{ if } \\mathbf{w}^T\\mathbf{x} + b > 0`}
        </MathBlock>
        <p className="mt-2">
          The weight vector <Math>{`\\mathbf{w}`}</Math> is normal to the separating hyperplane.
        </p>
      </Definition>

      <Theorem
        title="Support Vector Machines"
        className="my-6"
        proof={
          <>
            <p><strong>Margin calculation:</strong> For a separating hyperplane <Math>{`\\mathbf{w}^T\\mathbf{x} + b = 0`}</Math>, the distance from point <Math>{`\\mathbf{x}_i`}</Math> to the hyperplane is <Math>{`|\\mathbf{w}^T\\mathbf{x}_i + b|/\\|\\mathbf{w}\\|`}</Math>.</p>
            <p className="mt-2"><strong>Constraint normalization:</strong> Scale <Math>{`\\mathbf{w}, b`}</Math> so the closest points satisfy <Math>{`|\\mathbf{w}^T\\mathbf{x}_i + b| = 1`}</Math>. Then margin = <Math>{`1/\\|\\mathbf{w}\\|`}</Math>.</p>
            <p className="mt-2"><strong>Maximize margin:</strong> Maximize <Math>{`1/\\|\\mathbf{w}\\|`}</Math> ⟺ minimize <Math>{`\\|\\mathbf{w}\\|^2`}</Math>.</p>
            <p className="mt-2"><strong>Support vectors:</strong> The constraints <Math>{`y_i(\\mathbf{w}^T\\mathbf{x}_i + b) \\geq 1`}</Math> are active (equality) only for points on the margin boundaries. These are the support vectors; they determine the solution.</p>
          </>
        }
      >
        <p>
          SVM finds the maximum-margin hyperplane:
        </p>
        <MathBlock>
          {`\\min \\|\\mathbf{w}\\|^2 \\quad \\text{subject to } y_i(\\mathbf{w}^T\\mathbf{x}_i + b) \\geq 1`}
        </MathBlock>
        <p className="mt-2">
          The margin is <Math>{`2/\\|\\mathbf{w}\\|`}</Math>. Support vectors lie on the margin boundaries.
        </p>
      </Theorem>

      <h2>Neural Networks</h2>

      <Definition title="Neural Network as Matrix Operations" className="my-6">
        <p>
          A fully-connected layer computes:
        </p>
        <MathBlock>
          {`\\mathbf{h} = \\sigma(W\\mathbf{x} + \\mathbf{b})`}
        </MathBlock>
        <p className="mt-2">
          where <Math>\sigma</Math> is a nonlinear activation (ReLU, sigmoid, etc.).<br />
          Without nonlinearity, deep networks would collapse to a single matrix!
        </p>
      </Definition>

      <Example title="Matrix View of Deep Learning" className="my-6">
        <p>A 3-layer network:</p>
        <MathBlock>
          {`\\mathbf{y} = W_3 \\sigma(W_2 \\sigma(W_1 \\mathbf{x}))`}
        </MathBlock>
        <p className="mt-2">
          Training = finding <Math>W_1, W_2, W_3</Math> to minimize loss.<br />
          Gradients computed via backpropagation (chain rule + matrix calculus).
        </p>
      </Example>

      <h2>Gradient Descent</h2>

      <Definition title="Gradient Descent" className="my-6">
        <p>
          Minimize <Math>{`f(\\mathbf{w})`}</Math> by iterating:
        </p>
        <MathBlock>
          {`\\mathbf{w}_{k+1} = \\mathbf{w}_k - \\alpha \\nabla f(\\mathbf{w}_k)`}
        </MathBlock>
        <p className="mt-2">
          For least squares: <Math>{`\\nabla f = X^T(X\\mathbf{w} - y)`}</Math>
        </p>
      </Definition>

      <div className="bg-dark-800/50 rounded-xl p-4 my-6 border border-primary-500/20">
        <p className="font-semibold text-primary-400 mb-2">Condition Number in Optimization</p>
        <p className="text-dark-300 text-sm">
          Convergence rate of gradient descent depends on <Math>\kappa(X^TX)</Math>.<br />
          Ill-conditioned problems → slow convergence → need preconditioning or adaptive methods (Adam, etc.).
        </p>
      </div>

      <h2>Matrix Factorization</h2>

      <Definition title="Low-Rank Matrix Factorization" className="my-6">
        <p>
          Approximate matrix <Math>R</Math> (e.g., user-item ratings) as:
        </p>
        <MathBlock>
          {`R \\approx UV^T`}
        </MathBlock>
        <p className="mt-2">
          where <Math>U</Math> (users) and <Math>V</Math> (items) have <Math>k</Math> columns (latent factors).
          This is the basis of recommender systems!
        </p>
      </Definition>

      <h2>Regularization</h2>

      <Theorem
        title="Ridge Regression"
        className="my-6"
        proof={
          <>
            <p><strong>Objective:</strong> Minimize <Math>{`f(\\boldsymbol{\\beta}) = \\|X\\boldsymbol{\\beta} - \\mathbf{y}\\|^2 + \\lambda\\|\\boldsymbol{\\beta}\\|^2`}</Math>.</p>
            <p className="mt-2"><strong>Derivative:</strong> <Math>{`\\frac{\\partial f}{\\partial \\boldsymbol{\\beta}} = 2X^T(X\\boldsymbol{\\beta} - \\mathbf{y}) + 2\\lambda\\boldsymbol{\\beta} = 0`}</Math>.</p>
            <p className="mt-2"><strong>Solve:</strong> <Math>{`(X^TX + \\lambda I)\\boldsymbol{\\beta} = X^T\\mathbf{y}`}</Math>, giving <Math>{`\\hat{\\boldsymbol{\\beta}} = (X^TX + \\lambda I)^{-1}X^T\\mathbf{y}`}</Math>.</p>
            <p className="mt-2"><strong>Why it works:</strong> Adding <Math>{`\\lambda I`}</Math> shifts all eigenvalues of <Math>X^TX</Math> up by <Math>{`\\lambda`}</Math>. This:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Ensures invertibility (no zero eigenvalues)</li>
              <li>Reduces condition number: <Math>{`\\kappa = (\\sigma_{\\max}^2 + \\lambda)/(\\sigma_{\\min}^2 + \\lambda)`}</Math></li>
              <li>Shrinks coefficients toward zero (bias-variance tradeoff)</li>
            </ul>
          </>
        }
      >
        <p>
          Add penalty to prevent overfitting:
        </p>
        <MathBlock>
          {`\\min \\|X\\boldsymbol{\\beta} - y\\|^2 + \\lambda\\|\\boldsymbol{\\beta}\\|^2`}
        </MathBlock>
        <p className="mt-2">Solution:</p>
        <MathBlock>
          {`\\hat{\\boldsymbol{\\beta}} = (X^TX + \\lambda I)^{-1}X^Ty`}
        </MathBlock>
        <p className="mt-2 text-primary-400">
          Adding <Math>\lambda I</Math> improves condition number and shrinks coefficients.
        </p>
      </Theorem>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>PCA/SVD for dimensionality reduction; keep top <Math>k</Math> singular values.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>SVM: find max-margin hyperplane; <Math>{`\\mathbf{w}`}</Math> is normal vector.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>Neural networks: layers of matrix multiply + nonlinearity.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>Gradient descent: <Math>{`\\mathbf{w} \\to \\mathbf{w} - \\alpha\\nabla f`}</Math>; condition number affects speed.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">5.</span>
            <span>Ridge regression: <Math>{`(X^TX + \\lambda I)^{-1}X^Ty`}</Math> for regularization.</span>
          </li>
        </ul>
      </div>

      <div className="bg-gradient-to-br from-green-500/10 to-dark-800/50 rounded-xl p-6 my-8 border border-green-500/20">
        <h3 className="text-xl font-bold text-green-400 mb-4">Course Complete!</h3>
        <p className="text-dark-200">
          Congratulations on completing Introduction to Linear Algebra! You now have the foundation
          to understand and apply linear algebra in:
        </p>
        <ul className="list-disc list-inside mt-3 text-dark-300 space-y-1">
          <li>Machine Learning and Data Science</li>
          <li>Computer Graphics and Vision</li>
          <li>Signal Processing and Communications</li>
          <li>Scientific Computing and Engineering</li>
          <li>Cryptography and Coding Theory</li>
        </ul>
        <p className="mt-4 text-dark-200">
          Linear algebra is the language of modern applied mathematics. Keep exploring!
        </p>
      </div>
    </LessonLayout>
  );
}
