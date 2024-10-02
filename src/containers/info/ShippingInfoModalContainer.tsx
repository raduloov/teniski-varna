import React from 'react';
import styled from 'styled-components';
import { Color } from '../../assets/constants';

export const ShippingInfoModalContainer = () => (
  <Wrapper>
    <BoldText>ДОСТАВКА</BoldText>
    <Spacer />
    <Text>
      Доставката се извършва до всяка точка в България с куриерска фирма СПИДИ,
      както до техен офис, така и до избран от вас адрес. Можете да намерите
      всички офис на Спиди в страната ТУК.
    </Text>
    <LargeSpacer />
    <BoldText>Цени на доставката:</BoldText>
    <Spacer />
    <StyledUl>
      <li>
        <Text>
          Доставка до офис на Спиди: от 4,80 лв, в зависимост от стойността на
          наложения платеж.
        </Text>
      </li>
      <li>
        <Text>
          Доставка до адрес: от 7,80 лв, в зависимост от населеното място.
          Доставките се извършват в срок от 24 до 48 часа след завършване на
          поръчката, в зависимост от графика на куриерската фирма за съответното
          населено място. Запазваме си правото да удължим срока за доставка до 3
          работни дни.
        </Text>
      </li>
    </StyledUl>
    <Spacer />
    <Text>
      Работното време на Спиди е от понеделник до петък от 9:00 до 18:00 часа и
      в събота от 9:00 до 13:00 часа, като неделя е почивен ден.Спиди спазват
      празнично работни време! За някои по-малки населени места куриерите
      доставят само в определени дни. Можете да видите графика за доставките до
      вашето населено място най-долу на сайта на Спиди ТУК.
    </Text>
    <Spacer />
    <Text>Намерете най-близкия до вас офис на Спиди ТУК.</Text>
    <LargeSpacer />
  </Wrapper>
);

const StyledUl = styled.ul`
  margin-left: 24px;
`;

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
