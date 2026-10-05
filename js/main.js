const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

if (orderDialog) {
  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (selectedProductInput) {
        selectedProductInput.value = button.dataset.product || '';
      }

      orderDialog.showModal();
    });
  });
}

if (closeDialogButton && orderDialog) {
  closeDialogButton.addEventListener('click', () => {
    orderDialog.close();
  });
}

if (orderForm) {
  orderForm.addEventListener('invalid', (event) => {
    event.target.setAttribute('aria-invalid', 'true');
  }, true);

  orderForm.addEventListener('input', (event) => {
    if (event.target.willValidate && event.target.checkValidity()) {
      event.target.removeAttribute('aria-invalid');
    }
  });

  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formElements = Array.from(orderForm.elements);

    formElements.forEach((element) => {
      if (element.willValidate) {
        element.removeAttribute('aria-invalid');
      }
    });

    if (!orderForm.checkValidity()) {
      formElements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute('aria-invalid', 'true');
        }
      });

      orderForm.reportValidity();
      return;
    }

    if (successMessage) {
      successMessage.hidden = false;
    }

    orderForm.reset();

    if (orderDialog) {
      orderDialog.close();
    }
  });
}
