import React from 'react';
import styled from 'styled-components';
import { Color } from '../assets/constants';

export const TermsAndConditionsPage = () => {
  return (
    <Wrapper>
      <Title>Общи условия за ползване на уебсайта teniskivarna.com</Title>
      <LargeSpacer />
      <Text>
        Използването на този сайт и регистрирането на поръчка чрез него се счита
        за съгласие с настоящите Общи условия. Ако НЕ ПРИЕМАТЕ тези условия,
        моля, не използвайте този уебсайт. ТЕНИСКИ ВАРНА ЕООД си запазва правото
        да променя условията по всяко време, без предварително известие, като
        променените условия ще бъдат своевременно публикувани в сайта.
      </Text>
      <LargeSpacer />
      <BoldText>I. Общи условия</BoldText>
      <Spacer />
      <StyledUl>
        <li>
          <Text>
            www.teniskivarna.com е уебсайт за електронна търговия – за продажба
            и доставка на добавените в него стоки от името на ТЕНИСКИ ВАРНА
            ЕООД.
          </Text>
        </li>
        <li>
          <Text>
            ТЕНИСКИ ВАРНА ЕООД чрез www.teniskivarna.com има право да променя
            цените на предлаганите стоки по собствена преценка, без
            предварително уведомяване. Потребителят е длъжен да заплати цената,
            която е била актуална по време на поръчката на желаната стока.
          </Text>
        </li>
        <li>
          <Text>
            При посочени грешен адрес, лице за контакти и/или телефонен номер
            при поръчката, ТЕНИСКИ ВАРНА ЕООД чрез www.teniskivarna.com не е
            обвързано от каквото и да е задължение за изпълнение на поръчката.
          </Text>
        </li>
        <li>
          <Text>
            Договорът с Клиента се счита за сключен след приемане от ТЕНИСКИ
            ВАРНА ЕООД чрез www.teniskivarna.com на заявлението за покупка,
            попълнено правилно от Клиента по време на процеса на поръчка.
          </Text>
        </li>
        <li>
          <Text>
            ТЕНИСКИ ВАРНА ЕООД чрез www.teniskivarna.com се задължава, след
            получаване на заявление от Клиента, да му достави желаната стока или
            да информира Клиента за други обстоятелства относно заявката му.
          </Text>
        </li>
        <li>
          <Text>
            ТЕНИСКИ ВАРНА ЕООД не носи отговорност, ако Клиентът е посочил
            неверни и/или непълни данни в направена поръчка през уебсайта
            www.teniskivarna.com.
          </Text>
        </li>
        <li>
          <Text>
            Публикуваната на сайта информация за размери и съответствия трябва
            да се тълкува като ориентировъчна. ТЕНИСКИ ВАРНА ЕООД допуска
            наличието на разминавания между обявените и действителните размери,
            за което не носи отговорност.
          </Text>
        </li>
        <li>
          <Text>Всички обявени цени са в български левове с включен ДДС.</Text>
        </li>
      </StyledUl>
      <LargeSpacer />
      <BoldText>II. Права и задължения на страните</BoldText>
      <Spacer />
      <StyledOl>
        <li>
          <Text>ТЕНИСКИ ВАРНА ЕООД се задължава:</Text>
          <StyledUl>
            <li>
              <Text>
                да потвърди наличността на поръчаните артикули или да откаже
                поръчката в срок от 4 работни дни;
              </Text>
            </li>
            <li>
              <Text>
                да достави в срока, указан в информацията за доставка и плащане
                на стоки, заявената за покупка стока;
              </Text>
            </li>
            <li>
              <Text>
                гарантира, че всички продукти са фабрично нови (неупотребявани!)
                и запечатани от производителя.
              </Text>
            </li>
          </StyledUl>
          <Spacer />
        </li>
        <li>
          <Text>Клиентът се задължава:</Text>
          <StyledUl>
            <li>
              <Text>
                да посочи двете си имена, точена адрес и валиден телефон, адрес
                за доставка и имейл;
              </Text>
            </li>
            <li>
              <Text>
                да плати цената на стоката според условията, описани в
                информацията за Доставка и плащане на стоки;
              </Text>
            </li>
            <li>
              <Text>
                да заплати разходите по доставката според условията, описани в
                информацията за Доставка и плащане на стоки;
              </Text>
            </li>
            <li>
              <Text>
                да осигури достъп и възможност за получаване на стоката.
              </Text>
            </li>
          </StyledUl>
          <Spacer />
          <Text>
            Поръчаните стоки се доставят на посочения от Клиента адрес за
            доставка, в срока, указан в информацията за Доставка и плащане на
            стоки.
          </Text>
          <Spacer />
          <Text>
            Стоката се доставя подходящо опакована, съобразно вида ѝ и
            транспорта за доставка.
          </Text>
          <Spacer />
          <Text>
            При предава на стоката Клиентът или трето лице подписват
            придружаващите я документи. За трето лице се счита всеки, който не е
            титуляр на поръчката, но се намира на посочения от Клиента адрес и
            приема доставената стока.
          </Text>
          <Spacer />
          <Text>
            В случай, че Клиентът не бъде намерен в срока за изпълнение на
            доставката на посочения адрес или не бъде осигурен достъп и условия
            за предаване на стоката в този срок, ТЕНИСКИ ВАРНА ЕООД се
            освобождава от задължението си да достави поръчаната стока. Клиентът
            може да потвърди желанието си да получи стоката и след изтичане на
            срока на доставка, в който не е бил намерен на адреса, като поеме
            всички разходи по доставката. В този случай започва да тече нов срок
            за доставка от момента на потвърждението.
          </Text>
          <Spacer />
        </li>
        <li>
          <Text>Клиентът има право</Text>
          <Text>
            да откаже получаването на поръчаната от него стока, когато тя му
            бъде доставена, при едно от следните условия:
          </Text>
          <StyledUl>
            <li>
              <Text>
                доставената стока не съответства на поръчаната от Клиента и това
                може да се установи чрез обикновения ѝ преглед;
              </Text>
            </li>
            <li>
              <Text>
                цената, която Клиентът следва да заплати, не съответства на
                дължимата цена;
              </Text>
            </li>
            <li>
              <Text>
                има несъответствие между заявената за покупка и доставената
                стока, което не е било възможно да бъде установено в момента на
                доставката. В този случай Клиентът има право да заяви подмяна на
                размер или артикул, фигуриращ в първоначалната му поръчка, в
                срок не по-дълъг от 14 работни дни от датата на получаване на
                поръчката. Необходимо е пратката да бъде върната на адрес: гр.
                Варна 9000, бул. Сливница 185, Delta Planet Mall, обект на
                Тениски Варна;
              </Text>
            </li>
            <li>
              <Text>не му хареса / не отговаря на очакванията му.</Text>
            </li>
          </StyledUl>
          <Spacer />
          <Text>
            Клиентът има право в срок не по-дълъг от 14 работни дни, без да
            дължи обезщетение или неустойка и без да посочва причина, да върне
            посочените артикули на адрес гр. Варна 9000, бул. Сливница 185,
            Delta Planet Mall, обект на Тениски Варна;
          </Text>
          <Spacer />
          <Text>
            ТЕНИСКИ ВАРНА ЕООД възстановява всички суми, получени от Клиента,
            включително разходите за доставка.
          </Text>
          <Spacer />
          <Text>Разходите по връщане на стоките са за сметка на клиента.</Text>
        </li>
      </StyledOl>
      <LargeSpacer />
      <BoldText>III. Отговорност</BoldText>
      <Spacer />
      <Text>
        ТЕНИСКИ ВАРНА ЕООД чрез www.teniskivarna.com не носи отговорност за
        неизпълнение на задълженията си по този договор при настъпване на
        обстоятелства, които ТЕНИСКИ ВАРНА ЕООД чрез www.teniskivarna.com не е
        предвидило и не е било длъжно да предвиди – вкл., но не само, случаи на
        непреодолима сила, случайни събития, проблеми в глобалната мрежа на
        Интернет и в предоставянето на услугите извън контрола на ТЕНИСКИ ВАРНА
        ЕООД чрез www.teniskivarna.com.
      </Text>
      <LargeSpacer />
      <BoldText>IV. Арбитраж</BoldText>
      <Spacer />
      <Text>
        Всички спорове между страните се решават в дух на разбирателство и добра
        воля. В случай, че съгласие не бъде постигнато, всички неразрешени
        спорове, породени от договора между страните или отнасящи се до него,
        включително спорове, породени или отнасящи се до неговото тълкуване,
        недействителност, изпълнение или прекратяване, както и спорове за
        попълване на празноти в договора или приспособяването му към
        нововъзникнали обстоятелства, ще бъдат разрешавани от компетентния съд
        по регистрация на ТЕНИСКИ ВАРНА ЕООД съобразно българското
        законодателство.
      </Text>
      <LargeSpacer />
      <Text>
        Ако не приемате горните Общи условия, моля, не използвайте сайта!
      </Text>
      <LargeSpacer />
    </Wrapper>
  );
};

const StyledOl = styled.ol`
  margin-left: 24px;
`;

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
