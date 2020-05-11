// @ts-ignore
import MatrixMath from 'react-native/Libraries/Utilities/MatrixMath';
import {Vector3D} from '../../interfaces';

/**
 *
 * @param dx distance difference of x coordinate
 * @param dy distance difference of y coordinate
 *
 * @description
 * rotate x and y axis based on x and y distance
 */
export const rotateXY = (dx: number, dy: number) => {
  const radX = (Math.PI / 180) * dy;
  const cosX = Math.cos(radX);
  const sinX = Math.sin(radX);

  const radY = (Math.PI / 180) * -dx;
  const cosY = Math.cos(radY);
  const sinY = Math.sin(radY);

  return [
    cosY,
    sinX * sinY,
    cosX * sinY,
    0,
    0,
    cosX,
    -sinX,
    0,
    -sinY,
    cosY * sinX,
    cosX * cosY,
    0,
    0,
    0,
    0,
    1,
  ];
};

/**
 *
 * @param dx distance difference of x coordinate
 * @param dy distance difference of y coordinate
 *
 * @description
 * rotate x and z axis based on x and y distance
 */
export const rotateXZ = (dx: number, dy: number) => {
  const radX = (Math.PI / 180) * dx;
  const cosX = Math.cos(radX);
  const sinX = Math.sin(radX);

  const radY = (Math.PI / 180) * dy;
  const cosY = Math.cos(radY);
  const sinY = Math.sin(radY);

  return [
    cosX,
    -cosY * sinX,
    sinX * sinY,
    0,
    sinX,
    cosX * cosY,
    -sinY * cosX,
    0,
    0,
    sinY,
    cosY,
    0,
    0,
    0,
    0,
    1,
  ];
};

/**
 *
 * @param matrix matrix values
 * @param origin base vector origin
 */
export const transformOrigin = (matrix: number[], origin: Vector3D) => {
  const {x, y, z} = origin;

  const translate = MatrixMath.createIdentityMatrix();
  MatrixMath.reuseTranslate3dCommand(translate, x, y, z);
  MatrixMath.multiplyInto(matrix, translate, matrix);

  const untranslate = MatrixMath.createIdentityMatrix();
  MatrixMath.reuseTranslate3dCommand(untranslate, -x, -y, -z);
  MatrixMath.multiplyInto(matrix, matrix, untranslate);
};
