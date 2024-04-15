// Get all delete buttons
const deleteButtons = document.querySelectorAll(".deleteBtn");

// Attach click event listener to each delete button
deleteButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const userId = button.getAttribute("data-user-id"); // Get the user ID from the data attribute
    openModal(userId); // Open the modal with the user ID
  });
});

// Function to open the modal and handle the confirm button click event
function openModal(userId) {
  const modal = document.getElementById("myModal");
  const confirmBtn = document.getElementById("confirmBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  cancelBtn.addEventListener("click", function () {
    closeModal();
    location.reload();
  });
  // Attach click event listener to the confirm button
  confirmBtn.addEventListener("click", function () {
    // Post the user ID to the backend
    const data = { user_id: userId };
    console.log(data);
    fetch("/tenants/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        closeModal();
        location.reload();
      })
      .catch((error) => {
        console.log("Error deleting user:", error);
        closeModal();
      });
  });
  modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}
