import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section38() {
  return (
    <LessonLayout sectionId={38}>
      {/* Introduction */}
      <p>
        <strong>Graphs and networks</strong> are naturally described by matrices. The incidence matrix
        captures the structure of a graph, and linear algebra reveals properties like connectivity
        and current flow.
      </p>

      <h2>Graph Matrices</h2>

      <Definition title="Incidence Matrix" className="my-6">
        <p>
          For a graph with <Math>n</Math> nodes and <Math>m</Math> edges, the <strong>incidence matrix</strong>
          <Math>A</Math> is <Math>m \times n</Math>:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Row for each edge</li>
          <li>Column for each node</li>
          <li><Math>{`A_{ij} = -1`}</Math> if edge <Math>i</Math> starts at node <Math>j</Math></li>
          <li><Math>{`A_{ij} = +1`}</Math> if edge <Math>i</Math> ends at node <Math>j</Math></li>
        </ul>
      </Definition>

      <Example title="Triangle Graph" className="my-6">
        <p>A triangle with 3 nodes and 3 edges:</p>
        <MathBlock>
          {`A = \\begin{bmatrix} -1 & 1 & 0 \\\\ 0 & -1 & 1 \\\\ -1 & 0 & 1 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          Edge 1: node 1 → node 2<br />
          Edge 2: node 2 → node 3<br />
          Edge 3: node 1 → node 3
        </p>
      </Example>

      <h2>Kirchhoff's Laws</h2>

      <Theorem
        title="Kirchhoff's Current Law (Nullspace)"
        className="my-6"
        proof={
          <>
            <p>For edge <Math>e</Math> from node <Math>i</Math> to node <Math>j</Math>, row <Math>e</Math> of <Math>A</Math> has <Math>-1</Math> at column <Math>i</Math> and <Math>+1</Math> at column <Math>j</Math>.</p>
            <p className="mt-2">Thus <Math>{`(A\\mathbf{x})_e = x_j - x_i`}</Math> = voltage difference across edge <Math>e</Math>.</p>
            <p className="mt-2"><strong>Nullspace:</strong> <Math>{`A\\mathbf{x} = \\mathbf{0}`}</Math> means all voltage differences are zero: <Math>{`x_j = x_i`}</Math> for all edges.</p>
            <p className="mt-2">In a connected graph, this implies all <Math>{`x_i`}</Math> are equal. Thus <Math>{`N(A) = \\text{span}(\\mathbf{1})`}</Math> where <Math>{`\\mathbf{1} = (1, 1, \\ldots, 1)^T`}</Math>.</p>
          </>
        }
      >
        <p>
          If <Math>{`\\mathbf{x}`}</Math> represents voltages at nodes and <Math>{`\\mathbf{y} = A\\mathbf{x}`}</Math>
          represents voltage differences across edges:
        </p>
        <MathBlock>
          {`A\\mathbf{x} = \\mathbf{y} \\quad \\text{(potential differences)}`}
        </MathBlock>
        <p className="mt-2">
          The <strong>nullspace of A</strong> consists of constant vectors (all nodes at same voltage).
        </p>
      </Theorem>

      <Theorem
        title="Kirchhoff's Voltage Law (Left Nullspace)"
        className="my-6"
        proof={
          <>
            <p>Column <Math>j</Math> of <Math>A^T</Math> = row <Math>j</Math> of <Math>A</Math> corresponds to node <Math>j</Math>.</p>
            <p className="mt-2">The entry <Math>{`(A^T)_{je}`}</Math> is <Math>-1</Math> if edge <Math>e</Math> leaves node <Math>j</Math>, <Math>+1</Math> if it enters.</p>
            <p className="mt-2">Thus <Math>{`(A^T\\mathbf{f})_j = \\sum_e A_{ej}f_e`}</Math> = (current in) − (current out) at node <Math>j</Math>.</p>
            <p className="mt-2"><strong>Left nullspace:</strong> <Math>{`A^T\\mathbf{f} = \\mathbf{0}`}</Math> means current is conserved at every node.</p>
            <p className="mt-2">Such <Math>{`\\mathbf{f}`}</Math> corresponds to current flowing around loops (cycles) in the graph. The dimension equals the number of independent loops = <Math>m - n + 1</Math> for a connected graph.</p>
          </>
        }
      >
        <p>
          If <Math>{`\\mathbf{f}`}</Math> represents currents on edges:
        </p>
        <MathBlock>
          {`A^T\\mathbf{f} = \\mathbf{0} \\quad \\text{(current balance at each node)}`}
        </MathBlock>
        <p className="mt-2">
          The <strong>left nullspace</strong> gives loop currents (current flows around cycles).
        </p>
      </Theorem>

      <h2>The Graph Laplacian</h2>

      <Definition title="Graph Laplacian" className="my-6">
        <p>
          The <strong>graph Laplacian</strong> is:
        </p>
        <MathBlock>
          {`L = A^TA`}
        </MathBlock>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><Math>{`L_{ii}`}</Math> = degree of node <Math>i</Math></li>
          <li><Math>{`L_{ij} = -1`}</Math> if nodes <Math>i</Math> and <Math>j</Math> are connected</li>
          <li><Math>{`L_{ij} = 0`}</Math> otherwise</li>
        </ul>
      </Definition>

      <Example title="Triangle Laplacian" className="my-6">
        <MathBlock>
          {`L = A^TA = \\begin{bmatrix} 2 & -1 & -1 \\\\ -1 & 2 & -1 \\\\ -1 & -1 & 2 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          Each diagonal entry is 2 (each node has degree 2).
        </p>
      </Example>

      <Theorem
        title="Properties of the Laplacian"
        className="my-6"
        proof={
          <>
            <p><strong>Symmetric:</strong> <Math>{`(A^TA)^T = A^TA`}</Math>.</p>
            <p className="mt-2"><strong>Positive semidefinite:</strong> <Math>{`\\mathbf{x}^TL\\mathbf{x} = \\mathbf{x}^TA^TA\\mathbf{x} = \\|A\\mathbf{x}\\|^2 \\geq 0`}</Math>.</p>
            <p className="mt-2"><strong>Zero eigenvalue:</strong> <Math>{`L\\mathbf{1} = A^TA\\mathbf{1} = A^T\\mathbf{0} = \\mathbf{0}`}</Math> since each row of <Math>A</Math> has entries summing to 0.</p>
            <p className="mt-2"><strong>Connected components:</strong> <Math>{`\\lambda = 0`}</Math> iff <Math>{`\\mathbf{x} \\in N(A)`}</Math>. For a connected graph, <Math>{`N(A) = \\text{span}(\\mathbf{1})`}</Math>. For <Math>k</Math> components, <Math>{`\\dim N(A) = k`}</Math>.</p>
            <p className="mt-2"><strong>Algebraic connectivity:</strong> <Math>{`\\lambda_2 > 0`}</Math> iff the graph is connected. Larger <Math>{`\\lambda_2`}</Math> means the graph is "more connected" (harder to partition).</p>
          </>
        }
      >
        <ul className="list-disc list-inside space-y-2">
          <li><Math>L</Math> is symmetric positive semidefinite</li>
          <li>Smallest eigenvalue is 0, with eigenvector <Math>{`\\mathbf{1} = (1, 1, \\ldots, 1)`}</Math></li>
          <li>Number of zero eigenvalues = number of connected components</li>
          <li>Second smallest eigenvalue (<strong>algebraic connectivity</strong>) measures how connected the graph is</li>
        </ul>
      </Theorem>

      <h2>Adjacency Matrix</h2>

      <Definition title="Adjacency Matrix" className="my-6">
        <p>
          The <strong>adjacency matrix</strong> <Math>B</Math> has:
        </p>
        <MathBlock>
          {`B_{ij} = \\begin{cases} 1 & \\text{if edge between } i \\text{ and } j \\\\ 0 & \\text{otherwise} \\end{cases}`}
        </MathBlock>
        <p className="mt-2">
          <Math>L = D - B</Math> where <Math>D</Math> is the diagonal degree matrix.
        </p>
      </Definition>

      <div className="bg-dark-800/50 rounded-xl p-4 my-6 border border-primary-500/20">
        <p className="font-semibold text-primary-400 mb-2">Graph Applications</p>
        <ul className="list-disc list-inside text-dark-300 text-sm space-y-1">
          <li><strong>PageRank:</strong> Eigenvalues of web link matrix</li>
          <li><strong>Spectral clustering:</strong> Use eigenvectors of <Math>L</Math> to cluster nodes</li>
          <li><strong>Network flow:</strong> Solve <Math>{`A^TA\\mathbf{x} = \\mathbf{b}`}</Math></li>
          <li><strong>Random walks:</strong> Powers of transition matrix</li>
        </ul>
      </div>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>Incidence matrix <Math>A</Math>: rows = edges, columns = nodes.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span><Math>N(A)</Math> = constant voltages; <Math>N(A^T)</Math> = loop currents.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>Graph Laplacian <Math>L = A^TA</Math> is symmetric positive semidefinite.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>Zero eigenvalues of <Math>L</Math> count connected components.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">5.</span>
            <span>Second eigenvalue measures graph connectivity.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
