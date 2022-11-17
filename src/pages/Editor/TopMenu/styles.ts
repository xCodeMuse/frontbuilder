import styled from 'styled-components';
import { MEASUREMENT } from '@src/global/variables';

export const MenuContainer = styled.div`
  background-color: #404040;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  width: 100%;
`;

export const HomeButton = styled.div`
  width: 43px;
  //background-image: url('/favicon.png');
  font-family: Frontier, sans-serif;
  font-size: 30px;
  color: rgba(255, 255, 255, 0.45);
  text-align: center;
  line-height: 40px;
  background-size: 16px 14px;
  background-repeat: no-repeat;
  background-position: 10px center;
  //padding: 10px;
  height: 100%;
  cursor: pointer;
  border-right: 1px solid rgba(0, 0, 0, 0.76);

  &:hover {
    color: #24c1c1;
  }
`;

export const PageTitle = styled.div`
  height: 100%;
  color: rgba(255, 255, 255, 0.73);
  text-align: left;
  line-height: 30px;
  padding: 5px;
  font-size: 14px;
`;

export const HomeCol = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: flex-start;
  min-width: ${MEASUREMENT.LEFT_PANEL_WIDTH};
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.76);
  border-bottom: 1px solid rgba(0, 0, 0, 0.76);
`;

export const DevicesCol = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: center;
  //width: 65%;
  width: calc(100% - 500px);
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.76);
  border-bottom: 1px solid rgba(0, 0, 0, 0.76);
`;

export const PublishCol = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 5px;
  min-width: ${MEASUREMENT.RIGHT_PANEL_WIDTH};
  padding: 8px 5px;
  height: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.76);
`;

export const PublishButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #dad9d9;
  gap: 5px;
  border-radius: 4px;
  font-size: 13px;
  padding: 4px 10px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: white;
  }
`;

export const PreviewButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  background-color: #dad9d9;
  border-radius: 4px;
  font-size: 13px;
  padding: 4px 10px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: white;
  }
`;