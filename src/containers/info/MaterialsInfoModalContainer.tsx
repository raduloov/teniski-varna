import React from 'react';
import styled from 'styled-components';
import { Color } from '../../assets/constants';

export const MaterialsInfoModalContainer = () => (
  <Wrapper>
    <BoldText>ТЕНИСКИ:</BoldText>
    <Spacer />
    <Text>
      Предлагаме мъжки, дамски и детски тениски, изработени от 100% памук,
      изключително гладка и мека материя. Тениската тежи 180 гр., а цветовете са
      наситени и дълготрайни. Шията и раменете са с укрепваща и стабилизираща
      лента, което влияе положително на издръжливостта на шевовете. Безшевните
      страни са за по-добър комфорт при носене Размерите варират както следва:
      мъжки - S до 3XL, дамски от XS до XL+ и детски от 98см до 168см. Можете да
      видите таблицата с размерите ТУК.
    </Text>
    <Spacer />
    <Text>
      Както при всички памучни изделия, може да настъпи леко свиване след
      първото пране, но то е минимално.
    </Text>
    <Spacer />
    <BoldText>ЩАМПИ:</BoldText>
    <Spacer />
    <Text>
      DTF (Direct to Film) печатът е иновационна технология, която предлага
      изключително качество на изображенията и безкомпромисна издръжливост. С
      DTF печат можете да получите ярки цветове и детайлни дизайни, които
      остават живи дори след многократни изпирания.
    </Text>
    <Spacer />
    <Text>
      Процесът включва директно отпечатване на графиката върху специално фолио,
      след което се нанася върху текстил с помощта на термично пресоване.
      Резултатът е гладки и еластични щампи, които се усещат като част от
      тъканта.
    </Text>
    <Spacer />
    <Text>
      Можете да перете тениските в перална машина при температура от 30 до 40
      градуса!
    </Text>
    <Spacer />
    <Text>Не се препоръчва сушене в сушилня!</Text>
    <LargeSpacer />
  </Wrapper>
);

const LargeSpacer = styled.div`
  margin: 24px;
`;

const Spacer = styled.div`
  margin: 8px;
`;

const BoldText = styled.p`
  font-size: 24px;
  font-weight: bold;
`;

const Text = styled.p``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  padding-top: 1.5rem;
  color: ${Color.DARK_GRAY};

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;
