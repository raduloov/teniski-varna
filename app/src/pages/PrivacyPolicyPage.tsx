import React from 'react';
import styled from 'styled-components';
import { Color } from '../assets/constants';

export const PrivacyPolicyPage = () => {
  return (
    <Wrapper>
      <Title>Политика за Личните Данни</Title>
      <Spacer />
      <Text>Дата на последна актуализация: [въведете дата]</Text>
      <LargeSpacer />
      <BoldText>1. Въведение</BoldText>
      <Spacer />
      <Text>
        Настоящата Политика за Личните Данни описва начина, по който събираме,
        използваме и защитаваме личните данни на нашите клиенти при поръчка на
        стоки от нашия уебсайт.
      </Text>
      <LargeSpacer />
      <BoldText>2. Какви данни събираме</BoldText>
      <Spacer />
      <Text>При извършване на поръчка, ние събираме следната информация:</Text>
      <StyledUl>
        <li>
          <Text>Име</Text>
        </li>
        <li>
          <Text>Телефонен номер</Text>
        </li>
        <li>
          <Text>Имейл адрес</Text>
        </li>
        <li>
          <Text>Адрес за доставка</Text>
        </li>
      </StyledUl>
      <LargeSpacer />
      <BoldText>3. Цел на събиране на данни</BoldText>
      <Spacer />
      <Text>Вашите лични данни се използват единствено за следните цели:</Text>
      <StyledUl>
        <li>
          <Text>Обработка на поръчките</Text>
        </li>
        <li>
          <Text>Комуникация относно статусa на поръчката</Text>
        </li>
        <li>
          <Text>Доставка на стоките до посочения адрес</Text>
        </li>
      </StyledUl>
      <LargeSpacer />
      <BoldText>4. Правна основа за обработка на данни</BoldText>
      <Spacer />
      <Text>
        Обработката на вашите лични данни се основава на вашето съгласие, което
        давате при подаване на поръчката, и на необходимостта за изпълнение на
        договора за доставка на стоки.
      </Text>
      <LargeSpacer />
      <BoldText>5. Съхранение на данни</BoldText>
      <Spacer />
      <Text>
        Вашите лични данни се съхраняват за периода, необходим за изпълнение на
        целите, посочени по-горе, и в съответствие с приложимото
        законодателство.
      </Text>
      <LargeSpacer />
      <BoldText>6. Споделяне на данни</BoldText>
      <Spacer />
      <Text>
        Вашите лични данни няма да бъдат продавани, разкривани или предавани на
        трети лица, освен в случаите, когато е необходимо за изпълнение на
        поръчката (например на куриерска фирма за доставка).
      </Text>
      <LargeSpacer />
      <BoldText>7. Вашите права</BoldText>
      <Spacer />
      <Text>Вие имате следните права относно вашите лични данни:</Text>
      <StyledUl>
        <li>
          <Text>Право на достъп до вашите данни</Text>
        </li>
        <li>
          <Text>Право на корекция на неточни данни</Text>
        </li>
        <li>
          <Text>
            Право на изтриване на данни (&quot;право да бъдете забравени&quot;)
          </Text>
        </li>
        <li>
          <Text>Право на ограничаване на обработката</Text>
        </li>
        <li>
          <Text>Право на преносимост на данни</Text>
        </li>
      </StyledUl>
      <Spacer />
      <Text>
        Ако желаете да упражните някое от тези права, моля, свържете се с нас на
        посочения имейл.
      </Text>
      <LargeSpacer />
      <BoldText>8. Защита на данните</BoldText>
      <Spacer />
      <Text>
        Ние прилагаме адекватни технически и организационни мерки за защита на
        вашите лични данни от неоторизиран достъп, загуба или унищожаване.
      </Text>
      <LargeSpacer />
      <BoldText>9. Промени в Политиката за Личните Данни</BoldText>
      <Spacer />
      <Text>
        Ние си запазваме правото да актуализираме тази политика по всяко време.
        Препоръчваме ви редовно да я преглеждате за възможни промени.
      </Text>
      <LargeSpacer />
      <BoldText>10. Контакт</BoldText>
      <Spacer />
      <Text>
        Ако имате въпроси или притеснения относно нашата Политика за Личните
        Данни, моля, свържете се с нас на 0888228975 или на имейл адрес:
        teniskibussiness@gmail.com.
      </Text>
      <Spacer />
      <Text>ТЕНИСКИ ВАРНА ЕООД</Text>
      <Text>ЕИК: 207170625</Text>
      <Text>Град Варна, бул”Сливница” 185 етаж 0.</Text>
      <Text>МОЛ: Томислав Димитров</Text>
      <LargeSpacer />
    </Wrapper>
  );
};

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
  font-weight: bold;
`;

const Text = styled.p``;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const Wrapper = styled.div`
  padding: 16px;
  color: ${Color.DARK_GRAY};
`;
