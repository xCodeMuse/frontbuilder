import { ControlComponentType } from '@src/types';
import ColorControl from '@src/components/PropsEditor/controls/ColorControl';
import SizeControlFactory from '@src/components/PropsEditor/controls/SizeControl';
import TextControl from '@src/components/PropsEditor/controls/TextControl';
import JustifyControl from '@src/components/PropsEditor/controls/JustifyControl/JustifyControl';
import AlignControl from '@components/PropsEditor/controls/AlignControl';
import FlexDirectionControl from '@components/PropsEditor/controls/FlexDirectionControl';
import SpacingControl from '@components/PropsEditor/controls/SpacingControl';
import TextContentControl from '@src/components/PropsEditor/controls/TextContentControl';
import ImageControl from '@components/PropsEditor/controls/ImageControl';
import BackgroundSizeControl from '@components/PropsEditor/controls/BackgroundSizeControl';
import BackgroundRepeatControl from '@components/PropsEditor/controls/BackgroundRepeatControl';
import ObjectFitControl from '@components/PropsEditor/controls/ObjectFitControl';
import ImagePositionControl from '@components/PropsEditor/controls/ImagePositionControl';
import HeadingTypeControl from '@components/PropsEditor/controls/HeadingTypeControl';
import TextCaseControl from '@components/PropsEditor/controls/TextCaseControl';
import TextDecorationControl from '@components/PropsEditor/controls/TextDecorationControl';
import TextAlignmentControl from '@components/PropsEditor/controls/TextAlignmentControl';
import FontWeightControl from '@components/PropsEditor/controls/FontWeightControl';
import FontStyleControl from '@components/PropsEditor/controls/FontStyleControl';
import BackgroundBlendModeControl from '@components/PropsEditor/controls/BackgroundBlendModeControl';
import BorderStyleControl from '@components/PropsEditor/controls/BorderStyleControl';
import VisibilityControl from '@components/PropsEditor/controls/VisibilityControl';
import FontFamilyControl from '@components/PropsEditor/controls/FontFamilyControl';
import ClickActionControl from '@components/PropsEditor/controls/ClickActionControl';
import YesNoControl from '@components/PropsEditor/controls/YesNoControl';
import VideoControl from '@components/PropsEditor/controls/VideoControl';

const propsToControls: {
  [key: string]: { label: string; control: ControlComponentType };
} = {
  flexDirection: { label: 'Direction', control: FlexDirectionControl },
  justifyContent: { label: 'Justify', control: JustifyControl },
  alignItems: { label: 'Align', control: AlignControl },
  backgroundColor: { label: 'Color', control: ColorControl },
  borderColor: { label: 'Color', control: ColorControl },
  borderStyle: { label: 'Style', control: BorderStyleControl() },
  borderRadius: { label: 'Corner', control: SizeControlFactory(false) },
  borderWidth: { label: 'Width', control: SizeControlFactory(false) },
  color: { label: 'Color', control: ColorControl },
  height: { label: 'Height', control: SizeControlFactory() },
  minHeight: { label: 'Min Height', control: SizeControlFactory() },
  width: { label: 'Width', control: SizeControlFactory() },
  maxWidth: { label: 'Max Width', control: SizeControlFactory() },
  padding: { label: 'Padding', control: SpacingControl },
  margin: { label: 'Margin', control: SpacingControl },
  fontWeight: { label: 'Weight', control: FontWeightControl() },
  fontSize: { label: 'Size', control: SizeControlFactory(false) },
  lineHeight: { label: 'Line Height', control: SizeControlFactory(false) },
  textContent: { label: 'Text', control: TextContentControl },
  name: { label: 'Text', control: TextControl },
  videoSrc: { label: 'Source', control: VideoControl },
  showControls: { label: 'Show Controls', control: YesNoControl() },
  muted: { label: 'Muted', control: YesNoControl() },
  autoPlay: { label: 'Auto Play', control: YesNoControl() },
  loop: { label: 'Loop', control: YesNoControl() },
  src: { label: 'Source', control: ImageControl },
  objectFit: { label: 'Size', control: ObjectFitControl() },
  backgroundImage: { label: 'Image', control: ImageControl },
  backgroundSize: { label: 'Size', control: BackgroundSizeControl() },
  backgroundRepeat: { label: 'Repeat', control: BackgroundRepeatControl() },
  backgroundPosition: { label: 'Position', control: ImagePositionControl() },
  objectPosition: { label: 'Position', control: ImagePositionControl() },
  headingType: { label: 'Type', control: HeadingTypeControl() },
  textTransform: { label: 'Case', control: TextCaseControl() },
  textDecoration: { label: 'Line', control: TextDecorationControl() },
  textAlign: { label: 'Align', control: TextAlignmentControl() },
  fontStyle: { label: 'Style', control: FontStyleControl() },
  backgroundBlendMode: {
    label: 'Blend',
    control: BackgroundBlendModeControl(),
  },
  visibility: { label: 'Visibility', control: VisibilityControl() },
  fontFamily: { label: 'Font', control: FontFamilyControl() },
  clickAction: { label: 'On Click', control: ClickActionControl },
};

const getControlForProp = (prop: string) => {
  return propsToControls[prop] || { label: prop, control: null };
};

export default getControlForProp;
