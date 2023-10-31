import { Axis, SizeUnit } from '../Types/common'

export default class AxisSizeMapper {
  private static axisMap: Record<Axis, SizeUnit> = {
    x: 'width',
    y: 'height',
    z: 'depth',
  }

  private static sizeMap: Record<SizeUnit, Axis> = {
    width: 'x',
    height: 'y',
    depth: 'z',
  }

  static axisToSize(axis: Axis): SizeUnit {
    return AxisSizeMapper.axisMap[axis]
  }

  static sizeToAxis(size: SizeUnit): Axis {
    return AxisSizeMapper.sizeMap[size]
  }
}
