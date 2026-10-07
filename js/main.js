const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');
const agreementCheckbox = document.getElementById('agreement');
const submitButton = document.getElementById('submit-order');
const productSelect = document.getElementById('order-topic');

if (!orderDialog && productSelect) {
  const product = new URLSearchParams(window.location.search).get('product');
  if (Array.from(productSelect.options).some((option) => option.value === product)) {
    productSelect.value = product;
  }
}

if (agreementCheckbox && submitButton) {
  const updateSubmitState = () => {
    submitButton.disabled = !agreementCheckbox.checked;
  };
  updateSubmitState();
  agreementCheckbox.addEventListener('change', updateSubmitState);
  orderForm.addEventListener('reset', () => {
    submitButton.disabled = true;
    orderForm.querySelectorAll('[aria-invalid]').forEach((field) => {
      field.removeAttribute('aria-invalid');
    });
  });
}

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
