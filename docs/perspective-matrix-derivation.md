# CSS3 matrix3d 4x4 Perspective Projection Derivation

## Mathematical Foundations
Transforming cursor offsets $(x, y)$ into a 3D perspective plane requires constructing a $4 \times 4$ homogeneous transformation matrix:

$$\mathbf{M} = \mathbf{P} \cdot \mathbf{R}_x(\theta_x) \cdot \mathbf{R}_y(\theta_y) \cdot \mathbf{T}(z)$$

Eliminating WebGL canvas initialization reduces the memory footprint to <15 KB while maintaining 60 FPS compositor hardware acceleration.
