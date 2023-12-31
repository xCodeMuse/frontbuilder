import {
  getAllRegisteredElements,
  registerElements,
} from '@frontbuilder/renderer';
import {
  getContainerForTest,
  interceptPageApi,
  interceptProfilesApi,
} from '@cypress/utils';
import getControlForProp from '../../../src/components/PropsEditor/controls';
import ColorControl from '../../../src/components/PropsEditor/controls/ColorControl';
import FlexDirectionControl from '@components/PropsEditor/controls/FlexDirectionControl';
import AlignControl from '../../../src/components/PropsEditor/controls/AlignControl';
import JustifyControl from '../../../src/components/PropsEditor/controls/JustifyControl/JustifyControl';
import TextControl from '../../../src/components/PropsEditor/controls/TextControl';
import SizeControl from '../../../src/components/PropsEditor/controls/SizeControl';
import SpacingControl from '@components/PropsEditor/controls/SpacingControl';
import { generateHandlerTestId } from '@src/utils/tests';
import { getOnlyCssProps } from '@src/utils/helperFunctions';
import editAndAssertUsingJustifyControl from '@cypress/e2e/edit-props/controls/justifyControl';
import editAndAssertUsingAlignControl from '@cypress/e2e/edit-props/controls/alignControl';
import editAndAssertUsingFlexDirectionControl from '@cypress/e2e/edit-props/controls/flexDirectionControl';
import editAndAssertUsingSpacingControl from '@cypress/e2e/edit-props/controls/spacingControl';
import editAndAssertUsingColorControl from '@cypress/e2e/edit-props/controls/colorControl';
import editAndAssertUsingSizeControl from '@cypress/e2e/edit-props/controls/sizeControl';
import editAndAssertUsingTextControl from '@cypress/e2e/edit-props/controls/textControl';
import editAndAssertUsingVideoControl from '@cypress/e2e/edit-props/controls/videoControl';
import VideoControl from '@components/PropsEditor/controls/VideoControl';
import TextContentControl from '../../../src/components/PropsEditor/controls/TextContentControl';
import editAndAssertUsingTextContentControl from '@cypress/e2e/edit-props/controls/textContentControl';
import withEditHandler from '@src/pages/Editor/withEditHandler';

describe('Edit props', () => {
  registerElements(withEditHandler);
  const elements = getAllRegisteredElements();

  beforeEach(() => {
    cy.viewport(1447, 844);
  });

  Object.keys(elements).forEach((key, index) => {
    const element = elements[key].data;
    const { props } = element;
    element['data-testid'] = `props-${element.type}`;
    const editHandler = generateHandlerTestId(element, true);

    const cssProps = getOnlyCssProps(props);
    cssProps.forEach((propKey) => {
      it(`can edit ${propKey} for ${key}`, () => {
        if (element.hiddenProps?.includes(propKey)) return;

        const target = wrapperProps.includes(propKey)
          ? editHandler
          : `[data-testid="${element['data-testid']}"]`;

        interceptPageApi(getContainerForTest(element));
        interceptProfilesApi();
        cy.visit('/1/2');

        cy.get(target).click();

        const { control } = getControlForProp(propKey);
        const previousValue = props[propKey];
        cy.get('body').type('{cmd}2');
        cy.get('body').type('{ctrl}2');

        switch (control) {
          case ColorControl:
            editAndAssertUsingColorControl(target, propKey, previousValue);
            break;
          case SizeControl():
            editAndAssertUsingSizeControl(target, propKey, previousValue);
            break;
          case TextControl:
            editAndAssertUsingTextControl(target, propKey, previousValue);
            break;
          case VideoControl:
            editAndAssertUsingVideoControl(target, propKey, previousValue);
            break;
          case TextContentControl:
            editAndAssertUsingTextContentControl(
              target,
              propKey,
              previousValue
            );
            break;
          case JustifyControl:
            editAndAssertUsingJustifyControl(target, propKey, previousValue);
            break;
          case AlignControl:
            editAndAssertUsingAlignControl(target, propKey, previousValue);
            break;
          case FlexDirectionControl:
            editAndAssertUsingFlexDirectionControl(
              target,
              propKey,
              previousValue
            );
            break;
          case SpacingControl:
            editAndAssertUsingSpacingControl(target, propKey, previousValue);
            break;

          default:
            // updatedValue = previousValue;
            break;
        }
      });
    });
  });
});

const wrapperProps = [
  'height',
  'width',
  'margin',
  'name',
  'minHeight',
  'minWidth',
  'maxHeight',
  'maxWidth',
];
