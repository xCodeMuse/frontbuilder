import React, { useEffect } from 'react';
import { ElementType, ParentType } from '@frontbuilder/renderer';

import { commonEvent, draggableEvent } from '../events';
import Resizer from '../Resizer';
import QuickActions from '../QuickActions';
import { current } from '@src/common/current';
import { generateHandlerTestId } from '@src/utils/tests';
import { useRender } from '@src/hooks';
import { getProp, updateElementProp } from '@src/global/element';
import HighlightPadding from '@src/pages/Editor/Spacing/HighlightPadding';
import HighlightMargin from '@src/pages/Editor/Spacing/HighlightMargin';
import {
  copyObject,
  extractSpacing,
  showCaret,
} from '@src/utils/helperFunctions';
import ElementInfo from '@src/pages/Editor/ElementInfo';
import {
  getHandlerClassNames,
  isCurrentlyResizing,
  overrideStyles,
} from './helpers';
import { getStyledComponent, getStyledHandler } from './styles';
import SelectionBox from '@src/pages/Editor/SelectionBox';
import { useEditor } from '@src/hooks/useEditor';
import { RootPlaceholder } from '@src/pages/Editor/shared';

export interface ComponentWithHandlerProps {
  element: ElementType;
  parent: ParentType;
}

const WithEditHandler = (Component: any) => {
  const StyledComponent = getStyledComponent(Component);

  const StyledHandler = getStyledHandler();

  const NewComponent = ({ element, parent }: ComponentWithHandlerProps) => {
    const rerender = useEditor();
    const renderThisComponent = useRender();
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const [computedSize, setComputedSize] = React.useState<{
      width: string;
      height: string;
    }>({ width: '', height: '' });

    const getRect = () => {
      return wrapperRef.current
        ? wrapperRef.current.getBoundingClientRect()
        : null;
    };

    const isSelected = current.uuid === element.uuid;

    const updateProp = (newProp: any, undoAble: boolean = true) => {
      updateElementProp(element, newProp, undoAble);
      renderThisComponent();
    };

    const showPadding = true;
    const showMargin = true;

    useEffect(() => {
      // sync node computed style with element props
      const computedStyle = wrapperRef.current
        ? getComputedStyle(wrapperRef.current)
        : null;

      if (!computedStyle) return;
      const computedWidth = computedStyle.width;
      const computedHeight = computedStyle.height;

      if (isSelected) {
        setComputedSize({ width: computedWidth, height: computedHeight });

        if (renderThisComponent !== current.getRerender()) {
          current.setRerender(renderThisComponent);
        }

        // usually after undo or redo
        if (element !== current.getElement()) {
          current.setElement(element);
          current.setParent(parent);
          current.setRerender(renderThisComponent);
          rerender();
        }
      }
    }, [
      element.props.width,
      element.props?.mdScreen?.width,
      element.props?.smScreen?.width,
      element.props.height,
      element.props?.mdScreen?.height,
      element.props?.smScreen?.height,
      element,
      isSelected,
      renderThisComponent,
      parent,
      rerender,
    ]);

    useEffect(() => {
      // set initial selection
      if (!current.getElement() && !parent && rerender) {
        current.uuid = element.uuid;
        current.setElement(element);
        current.setParent(null);
        current.setRerender(renderThisComponent);
        rerender();
      }
    }, [element, parent, rerender, renderThisComponent]);

    const isEditingTextContent = current.isEditingTextContent();
    useEffect(() => {
      const isEditingTextContent = current.isEditingTextContent();

      if (wrapperRef.current) {
        const childElement = wrapperRef.current.children[0] as HTMLElement;
        childElement.contentEditable = String(
          isSelected && isEditingTextContent
        );

        if (isSelected && isEditingTextContent) showCaret(childElement);
      }
    }, [isEditingTextContent, isSelected]);

    const { handlerStyles, componentStyles } = getHandlerStyles(
      element.props,
      element
    );

    const showBoxPlaceHolder =
      element.type === 'Box' &&
      element.props?.name?.toLowerCase() === 'root' &&
      !element.children.length;

    const wrapWithHandler = (children: any) => {
      return (
        <StyledHandler
          data-testid={generateHandlerTestId(element)}
          id={element.id}
          ref={wrapperRef}
          className={getHandlerClassNames(element)}
          {...commonEvent(element, parent, rerender, renderThisComponent)}
          {...draggableEvent(element, parent, rerender)}
          style={handlerStyles.inline}
          styles={handlerStyles.lg}
          mdStyles={handlerStyles.md}
          smStyles={handlerStyles.sm}
        >
          <ElementInfo
            isSelected={isSelected}
            width={computedSize.width}
            height={computedSize.height}
          />
          {children}
          {isSelected && (
            <>
              <Resizer
                setProp={updateProp}
                getRect={getRect}
                showWidth={!element.hiddenProps?.includes('width')}
                showHeight={!element.hiddenProps?.includes('height')}
              />
              {parent && <QuickActions />}
              {showPadding && (
                <HighlightPadding
                  padding={extractSpacing(getProp(element, 'padding') || '0px')}
                />
              )}
              {showMargin && (
                <HighlightMargin
                  margin={extractSpacing(getProp(element, 'margin') || '0px')}
                />
              )}
            </>
          )}
          <SelectionBox />
          {showBoxPlaceHolder && <RootPlaceholder />}
        </StyledHandler>
      );
    };

    return wrapWithHandler(
      <StyledComponent
        element={element}
        parent={parent}
        styles={overrideStyles(componentStyles.lg, element)}
        mdStyles={overrideStyles(componentStyles?.md, element)}
        smStyles={overrideStyles(componentStyles?.sm, element)}
      />
    );
  };

  return NewComponent;
};

export default WithEditHandler;

const getHandlerStyles = (props: any, element: ElementType) => {
  const newProps = copyObject(props);

  const { name, textContent, mdScreen, smScreen, ...styles } = newProps;

  const createStyleForHandler = (styles: any) => {
    const newStyle: any = {};
    if (styles?.height) {
      newStyle.height = styles.height;
    }
    if (styles?.width) {
      newStyle.width = styles.width;
    }
    if (styles?.margin) {
      newStyle.margin = styles.margin;
    }
    if (styles?.minHeight) {
      newStyle.minHeight = styles.minHeight;
    }

    if (styles?.maxHeight) {
      newStyle.maxHeight = styles.maxHeight;
    }

    if (styles?.minWidth) {
      newStyle.minWidth = styles.minWidth;
    }

    if (styles?.maxWidth) {
      newStyle.maxWidth = styles.maxWidth;
    }

    return newStyle;
  };

  const handlerStyles = {
    lg: createStyleForHandler(styles),
    md: {
      ...createStyleForHandler(styles),
      ...createStyleForHandler(mdScreen),
    },
    sm: {
      ...createStyleForHandler(styles),
      ...createStyleForHandler(mdScreen),
      ...createStyleForHandler(smScreen),
    },
    inline: {},
  };

  handlerStyles.inline = isCurrentlyResizing()
    ? {
        height: getProp(element, 'height'),
        width: getProp(element, 'width'),
      }
    : {};

  return {
    handlerStyles,
    componentStyles: {
      lg: styles,
      md: mdScreen,
      sm: smScreen,
    },
  };
};
