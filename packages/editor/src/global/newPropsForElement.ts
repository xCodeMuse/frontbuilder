const newPropsForElement: any = {
  Box: {
    backgroundBlendMode: 'normal',
    backgroundImage: '',
    backgroundSize: 'contain',
    backgroundPosition: 'left',
    backgroundRepeat: 'no-repeat',
    borderColor: 'rgb(255 255 255 / 0)',
    borderWidth: 0,
    borderStyle: 'solid',
    borderRadius: '0px',
    maxWidth: 'unset',
    visibility: 'visible',
  },
  Heading: {
    fontSize: 'inherit',
    visibility: 'visible',
  },
  Button: {
    borderColor: 'rgb(128, 128, 128)',
    borderWidth: 1,
    borderStyle: 'solid',
    visibility: 'visible',
  },
  Image: {
    visibility: 'visible',
  },
  Paragraph: {
    visibility: 'visible',
    color: 'black',
    fontSize: 16,
    textAlign: 'left',
    maxWidth: 'unset',
    lineHeight: 'inherit',
  },
  Video: {
    visibility: 'visible',
  },
};
const getNewPropsForElement = (elementType: string) => {
  return newPropsForElement[elementType] || {};
};

export default getNewPropsForElement;
