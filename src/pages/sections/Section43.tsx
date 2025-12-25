import { LessonLayout } from '@/components/layout/LessonLayout';
import { Definition, Theorem, Example } from '@/components/common/ContentBlocks';
import { Math, MathBlock } from '@/components/common/MathBlock';

export default function Section43() {
  return (
    <LessonLayout sectionId={43}>
      {/* Introduction */}
      <p>
        <strong>Computer graphics</strong> relies heavily on linear algebra. Transformations—rotation,
        scaling, translation, and projection—are all represented by matrices.
      </p>

      <h2>2D Transformations</h2>

      <Definition title="Basic 2D Matrices" className="my-6">
        <p><strong>Rotation</strong> by angle <Math>\theta</Math>:</p>
        <MathBlock>
          {`R_\\theta = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2"><strong>Scaling</strong> by factors <Math>s_x, s_y</Math>:</p>
        <MathBlock>
          {`S = \\begin{bmatrix} s_x & 0 \\\\ 0 & s_y \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2"><strong>Reflection</strong> across <Math>x</Math>-axis:</p>
        <MathBlock>
          {`F = \\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}`}
        </MathBlock>
      </Definition>

      <h2>Homogeneous Coordinates</h2>

      <Definition title="Homogeneous Coordinates" className="my-6">
        <p>
          To include <strong>translation</strong>, use homogeneous coordinates:
        </p>
        <MathBlock>
          {`(x, y) \\to \\begin{bmatrix} x \\\\ y \\\\ 1 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">Translation by <Math>(t_x, t_y)</Math>:</p>
        <MathBlock>
          {`T = \\begin{bmatrix} 1 & 0 & t_x \\\\ 0 & 1 & t_y \\\\ 0 & 0 & 1 \\end{bmatrix}`}
        </MathBlock>
      </Definition>

      <Example title="Rotate Around a Point" className="my-6">
        <p>
          To rotate around point <Math>(a, b)</Math>:
        </p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Translate <Math>(a, b)</Math> to origin</li>
          <li>Rotate</li>
          <li>Translate back</li>
        </ol>
        <MathBlock>
          {`M = T(a,b) \\cdot R_\\theta \\cdot T(-a,-b)`}
        </MathBlock>
      </Example>

      <h2>3D Transformations</h2>

      <Definition title="3D Rotation Matrices" className="my-6">
        <p><strong>Rotation around z-axis:</strong></p>
        <MathBlock>
          {`R_z(\\theta) = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta & 0 \\\\ \\sin\\theta & \\cos\\theta & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}`}
        </MathBlock>
        <p className="mt-2">
          Similar matrices for rotation around <Math>x</Math> and <Math>y</Math> axes.
        </p>
      </Definition>

      <Theorem
        title="Properties of Rotation Matrices"
        className="my-6"
        proof={
          <>
            <p><strong>Orthogonal:</strong> Rotations preserve lengths and angles. In 2D, verify directly:</p>
            <MathBlock>{`R_\\theta^T R_\\theta = \\begin{bmatrix} \\cos\\theta & \\sin\\theta \\\\ -\\sin\\theta & \\cos\\theta \\end{bmatrix} \\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix} = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}`}</MathBlock>
            <p className="mt-2">Using <Math>{`\\cos^2\\theta + \\sin^2\\theta = 1`}</Math>.</p>
            <p className="mt-2"><strong>Determinant 1:</strong> <Math>{`\\det R_\\theta = \\cos^2\\theta + \\sin^2\\theta = 1`}</Math>.</p>
            <p className="mt-2">The determinant being +1 (not -1) means orientation is preserved (no reflection).</p>
            <p className="mt-2"><strong>Inverse = transpose:</strong> From <Math>{`R^TR = I`}</Math>, we have <Math>{`R^T = R^{-1}`}</Math>. Geometrically, rotating by <Math>{`-\\theta`}</Math> undoes rotation by <Math>{`\\theta`}</Math>, and <Math>{`R_{-\\theta} = R_\\theta^T`}</Math>.</p>
          </>
        }
      >
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Orthogonal:</strong> <Math>R^TR = I</Math></li>
          <li><strong>Determinant 1:</strong> <Math>\det R = 1</Math> (preserves orientation)</li>
          <li><strong>Inverse = transpose:</strong> <Math>{`R^{-1} = R^T`}</Math></li>
        </ul>
      </Theorem>

      <h2>Projection</h2>

      <Definition title="Perspective Projection" className="my-6">
        <p>
          Project 3D points onto a 2D image plane at distance <Math>d</Math>:
        </p>
        <MathBlock>
          {`(x, y, z) \\to \\left(\\frac{dx}{z}, \\frac{dy}{z}\\right)`}
        </MathBlock>
        <p className="mt-2">In homogeneous coordinates:</p>
        <MathBlock>
          {`P = \\begin{bmatrix} 1 & 0 & 0 & 0 \\\\ 0 & 1 & 0 & 0 \\\\ 0 & 0 & 1 & 0 \\\\ 0 & 0 & 1/d & 0 \\end{bmatrix}`}
        </MathBlock>
      </Definition>

      <Example title="Orthographic Projection" className="my-6">
        <p>
          Simply drop the <Math>z</Math>-coordinate (parallel projection):
        </p>
        <MathBlock>
          {`P_{\\text{orth}} = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\end{bmatrix}`}
        </MathBlock>
      </Example>

      <div className="bg-dark-800/50 rounded-xl p-4 my-6 border border-primary-500/20">
        <p className="font-semibold text-primary-400 mb-2">Graphics Pipeline</p>
        <p className="text-dark-300 text-sm">
          Modern graphics follows: Model → World → View → Projection → Screen<br />
          Each stage is a matrix multiplication. The GPU does millions per second!
        </p>
      </div>

      <h2>Quaternions</h2>

      <Definition title="Quaternions for Rotation" className="my-6">
        <p>
          <strong>Quaternions</strong> represent 3D rotations more compactly:
        </p>
        <MathBlock>
          {`q = w + xi + yj + zk`}
        </MathBlock>
        <p className="mt-2">
          Advantages over rotation matrices:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>4 numbers instead of 9</li>
          <li>No gimbal lock</li>
          <li>Smooth interpolation (SLERP)</li>
        </ul>
      </Definition>

      <h2>Key Ideas</h2>

      <div className="bg-gradient-to-br from-primary-500/10 to-dark-800/50 rounded-xl p-6 my-6 border border-primary-500/20">
        <ul className="space-y-3 text-dark-200">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>Rotation, scaling, reflection are 2×2 (or 3×3) matrices.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>Homogeneous coordinates allow translation as matrix multiplication.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>Composite transformations: multiply matrices in order.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>Rotation matrices are orthogonal with determinant 1.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">5.</span>
            <span>Perspective projection divides by depth (non-linear in Cartesian).</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
