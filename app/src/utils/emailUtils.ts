import {
  translateColorToBulgarian,
  translateTypeToBulgarian
} from '../components/features/cart/utils';
import { OrderShippingInfo } from '../components/features/checkout/utils';
import { mapSizeToString } from '../containers/adminPanel/utils';
import { CartProduct } from '../domain/mappers/cartProductMapper';
import { EmailProps } from '../hooks/useMailgun';
import { PromoCode } from '../hooks/usePromoCodes';

export const sendEmailToCustomer = async (
  callback: (props: EmailProps) => Promise<void>,
  shippingInfo: OrderShippingInfo
) => {
  const emailProps: EmailProps = {
    to: shippingInfo.email,
    subject: 'Поръчка от Teniski Varna',
    text: 'Благодарим ви, че избрахте нашите продукти!',
    html: `
      <p>Благодарим ви, че избрахте нашите продукти!</p>
      <p>Информация за доставка:</p>
      <p>Име: ${shippingInfo.firstName} ${shippingInfo.lastName}</p>
      ${
        shippingInfo.speedyOffice
          ? `<p>Офис на Speedy: ${shippingInfo.speedyOffice}</p>`
          : ''
      }
      ${
        shippingInfo.personalAddress
          ? `<p>Личен адрес: ${shippingInfo.personalAddress}</p>`
          : ''
      }
      <p>Телефон: ${shippingInfo.phone}</p>
    `
  };

  await callback(emailProps);
};

export const sendEmailToAdmin = async (
  callback: (props: EmailProps) => Promise<void>,
  shippingInfo: OrderShippingInfo,
  items: CartProduct[],
  promoCode: PromoCode | null,
  totalPrice: number,
  shippingCost?: number
) => {
  const emailProps: EmailProps = {
    to: 'raduloov@gmail.com',
    subject: `Нова поръчка от Teniski Varna`,
    text: `Нова поръчка от ${shippingInfo.firstName} ${shippingInfo.lastName} на обща стойност ? лв.`,
    html: generateAdminEmailHtml(
      shippingInfo,
      items,
      promoCode,
      totalPrice,
      shippingCost
    )
  };

  await callback(emailProps);
};

const generateAdminEmailHtml = (
  shippingInfo: OrderShippingInfo,
  items: CartProduct[],
  promoCode: PromoCode | null,
  totalPrice: number,
  shippingCost?: number
) => {
  let productTable = `
    <div>
      <table>
        <caption>Поръчка</caption>
        <thead>
          <tr>
            <th>Продукт</th>
            <th>Модел</th>
            <th>Цвят</th>
            <th>Размер</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
  `;

  items.forEach((item) => {
    productTable += `
      <tr>
        <td>${item.title}</td>
        <td>${translateTypeToBulgarian(item.type)}</td>
        <td>${translateColorToBulgarian(item.color)}</td>
        <td>${mapSizeToString(item.size)}</td>
        <td>${item.price.toFixed(2)}лв</td>
      </tr>
    `;
  });

  productTable += `
        </tbody>
      </table>
    </div>
  `;

  const priceTable = `
    <div>
      <table>
        <caption>Цена</caption>
        <thead>
          <tr>
            <th>Доставка</th>
            <th>Промо код</th>
            <th>Общо</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${shippingCost ? `${shippingCost}лв` : 'N/A'}</td>
            <td>${promoCode ? `${promoCode.percentage}%` : 'N/A'}</td>
            <td>${totalPrice}лв</td>
          </tr>
      </table>
    </div>
  `;

  const shippingTable = `
    <div>
      <table>
        <caption>Доставка</caption>
        <thead>
          <tr>
            <th>Име</th>
            <th>Телефон</th>
            <th>Имейл</th>
            <th>${
              shippingInfo.speedyOffice ? 'Офис на Speedy' : 'Личен адрес'
            }</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${shippingInfo.firstName} ${shippingInfo.lastName}</td>
            <td>${shippingInfo.phone}</td>
            <td>${shippingInfo.email}</td>
            <td>${
              shippingInfo.speedyOffice ?? shippingInfo.personalAddress
            }</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;

  const emailHtml = `
    ${productTable}
    ${priceTable}
    ${shippingTable}
  `;

  return emailHtml;
};
