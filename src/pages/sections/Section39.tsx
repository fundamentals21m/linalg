import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section39() {
  return (
    <LessonLayout sectionId={39}>
      {/* Introduction */}
      <p>
        Linear algebra is the foundation of <strong>engineering analysis</strong>. From structural
        mechanics to circuit analysis to control systems, matrices encode physical laws and constraints.
      </p>

      <h2>Structural Analysis</h2>

      <Definition title="Stiffness Matrix" className="my-6">
        <p>
          In structural mechanics, the relationship between forces and displacements is:
        </p>
        <MathBlock>
          {`K\\mathbf{u} = \\mathbf{f}`}
        </MathBlock>
        <p className="mt-2">
          where <Math>K</Math> is the <strong>stiffness matrix</strong>, <Math>{`\\mathbf{u}`}</Math> are displacements,
          and <Math>{`\\mathbf{f}`}</Math> are forces.
        </p>
      </Definition>

      <Theorem
        title="Properties of Stiffness Matrices"
        className="my-6"
        proof={
          <>
            <p><strong>Symmetric (Maxwell-Betti):</strong> The force at node <Math>i</Math> due to unit displacement at node <Math>j</Math> equals the force at <Math>j</Math> due to unit displacement at <Math>i</Math>.</p>
            <p className="mt-2">Physically: <Math>{`K_{ij}`}</Math> = work done by force at <Math>i</Math> when <Math>j</Math> moves = <Math>{`K_{ji}`}</Math> by reciprocity.</p>
            <p className="mt-2"><strong>Positive semidefinite:</strong> The strain energy stored in the structure is:</p>
            <MathBlock>{`U = \\frac{1}{2}\\mathbf{u}^T K \\mathbf{u} = \\frac{1}{2}\\sum_{\\text{elements}} k_e (\\Delta u_e)^2 \\geq 0`}</MathBlock>
            <p className="mt-2">Energy is always nonnegative, so <Math>K</Math> is positive semidefinite.</p>
            <p className="mt-2"><strong>Positive definite when constrained:</strong> Zero energy implies zero deformation. If rigid body motions (translations, rotations) are constrained, the only zero-energy state is <Math>{`\\mathbf{u} = \\mathbf{0}`}</Math>, so <Math>K</Math> becomes positive definite.</p>
          </>
        }
      >
        <p>Physical stiffness matrices are:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Symmetric:</strong> <Math>K = K^T</Math> (Maxwell-Betti reciprocity)</li>
          <li><strong>Positive semidefinite:</strong> Energy <Math>{`\\mathbf{u}^T K \\mathbf{u} \\geq 0`}</Math></li>
          <li><strong>Positive definite</strong> when rigid body motions are constrained</li>
        </ul>
      </Theorem>

      <Example title="Spring System" className="my-6">
        <p>Three masses connected by two springs with constants <Math>k_1, k_2</Math>:</p>
        <MathBlock>
          {`K = \\begin{bmatrix} k_1 & -k_1 & 0 \\\\ -k_1 & k_1+k_2 & -k_2 \\\\ 0 & -k_2 & k_2 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          This is singular (nullspace = constant displacement). Fix one end to make it positive definite.
        </p>
      </Example>

      <h2>Finite Element Method</h2>

      <Definition title="Finite Element Assembly" className="my-6">
        <p>
          The global stiffness matrix is assembled from element matrices:
        </p>
        <MathBlock>
          {`K = \\sum_{e=1}^{N} A_e^T K_e A_e`}
        </MathBlock>
        <p className="mt-2">
          where <Math>K_e</Math> is the element stiffness and <Math>A_e</Math> maps element DOFs to global DOFs.
        </p>
      </Definition>

      <h2>Circuit Analysis</h2>

      <Theorem
        title="Nodal Analysis"
        className="my-6"
        proof={
          <>
            <p><strong>Step 1:</strong> The incidence matrix <Math>A</Math> encodes the graph structure. For edge <Math>e</Math> from node <Math>j</Math> to node <Math>k</Math>: voltage difference = <Math>{`v_k - v_j = (A\\mathbf{v})_e`}</Math>.</p>
            <p className="mt-2"><strong>Step 2 (Ohm's law):</strong> Current on edge <Math>e</Math> is <Math>{`i_e = c_e (A\\mathbf{v})_e`}</Math>. In matrix form: <Math>{`\\mathbf{i}_{\\text{edge}} = CA\\mathbf{v}`}</Math>.</p>
            <p className="mt-2"><strong>Step 3 (Kirchhoff's current law):</strong> Current into each node sums to zero (plus external sources):</p>
            <MathBlock>{`A^T \\mathbf{i}_{\\text{edge}} = A^T C A \\mathbf{v} = \\mathbf{i}_{\\text{ext}}`}</MathBlock>
            <p className="mt-2">The matrix <Math>A^TCA</Math> is the weighted graph Laplacian.</p>
          </>
        }
      >
        <p>
          For an electrical circuit, Kirchhoff's laws give:
        </p>
        <MathBlock>
          {`A^T C A \\mathbf{v} = \\mathbf{i}`}
        </MathBlock>
        <p className="mt-2">
          where <Math>A</Math> is the incidence matrix, <Math>C</Math> is diagonal conductances,
          <Math>{`\\mathbf{v}`}</Math> are node voltages, and <Math>{`\\mathbf{i}`}</Math> are current sources.
        </p>
      </Theorem>

      <Example title="Resistor Network" className="my-6">
        <p>
          For resistors with conductances <Math>g_1, g_2, g_3</Math> forming a Y-network:
        </p>
        <MathBlock>
          {`G = A^T \\begin{bmatrix} g_1 & 0 & 0 \\\\ 0 & g_2 & 0 \\\\ 0 & 0 & g_3 \\end{bmatrix} A`}
        </MathBlock>
        <p className="mt-2">
          The conductance matrix <Math>G</Math> is the weighted graph Laplacian.
        </p>
      </Example>

      <h2>Vibration Analysis</h2>

      <Definition title="Eigenvalue Problem for Vibrations" className="my-6">
        <p>
          Free vibrations satisfy:
        </p>
        <MathBlock>
          {`K\\mathbf{u} = \\omega^2 M\\mathbf{u}`}
        </MathBlock>
        <p className="mt-2">
          where <Math>M</Math> is the mass matrix. Natural frequencies are <Math>{`\\omega = \\sqrt{\\lambda}`}</Math>
          where <Math>\lambda</Math> are eigenvalues of <Math>{`M^{-1}K`}</Math>.
        </p>
      </Definition>

      <div className="bg-dark-800/50 rounded-xl p-4 my-6 border border-primary-500/20">
        <p className="font-semibold text-primary-400 mb-2">Engineering Applications</p>
        <ul className="list-disc list-inside text-dark-300 text-sm space-y-1">
          <li><strong>Structural:</strong> Buildings, bridges, aircraft frames</li>
          <li><strong>Thermal:</strong> Heat conduction, temperature distribution</li>
          <li><strong>Fluid:</strong> Potential flow, groundwater seepage</li>
          <li><strong>Electromagnetic:</strong> Field analysis, antenna design</li>
        </ul>
      </div>

      <h2>Control Systems</h2>

      <Definition title="State-Space Representation" className="my-6">
        <p>
          A linear control system is described by:
        </p>
        <MathBlock>
          {`\\dot{\\mathbf{x}} = A\\mathbf{x} + B\\mathbf{u}`}
        </MathBlock>
        <MathBlock>
          {`\\mathbf{y} = C\\mathbf{x} + D\\mathbf{u}`}
        </MathBlock>
        <p className="mt-2">
          Eigenvalues of <Math>A</Math> determine stability. System is stable if all eigenvalues
          have negative real parts.
        </p>
      </Definition>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>Stiffness matrix <Math>K</Math> relates forces to displacements: <Math>{`K\\mathbf{u} = \\mathbf{f}`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>Physical matrices are symmetric positive (semi)definite.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>Finite elements: assemble global matrix from element matrices.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>Natural frequencies come from eigenvalue problem <Math>{`K\\mathbf{u} = \\omega^2 M\\mathbf{u}`}</Math>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">5.</span>
            <span>Control systems: eigenvalues of <Math>A</Math> determine stability.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
