import { ElementType } from '@frontbuilder/renderer';
import { current } from '@src/common/current';

export const overrideStyles = (styles: any, element: ElementType) => {
  const rootMinHeightOnEdit =
    element.props.name?.toLowerCase() === 'root'
      ? { minHeight: 'calc(100vh - 52px)' }
      : {};

  return {
    ...styles,
    height: '100%',
    width: '100%',
    margin: '0px',
    minWidth: 'unset',
    maxWidth: 'unset',
    maxHeight: 'unset',
    ...rootMinHeightOnEdit,
  };
};

export const isCurrentlyResizing = () => {
  return current.isResizing().width || current.isResizing().height;
};

export const getHandlerClassNames = (element: ElementType) => {
  const isElementSelected = current.uuid === element.uuid;
  const selectedClassName = isElementSelected ? 'selected' : '';
  const directionClassName = element.props.flexDirection
    ? 'direction-' + element.props.flexDirection
    : '';
  const rootClassName =
    element.props.name?.toLowerCase() === 'root' ? 'root-element' : '';

  return `selectable ${element.className} edit-handler-wrapper ${selectedClassName} ${directionClassName} ${rootClassName}`;
};
