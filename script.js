
document.addEventListener("DOMContentLoaded", function () {
const termSelect = document.getElementById('termSelect');
const subjectSelect = document.getElementById('subjectSelect');
const exerciseCardsContainer = document.getElementById('exerciseCards');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const documentCountElement = document.getElementById('documentCount'); // Added this line

let totalDocuments = 0; // Added this line

// Load JSON data
fetch('https://circleapi.u1u1u1u1u1u1u1.repl.co/api/books')
  .then(response => response.json())
  .then(data => {

    function filterExercises(selectedTerm, selectedSubject, searchQuery) {
      // Clear existing exercise cards
      exerciseCardsContainer.innerHTML = '';

      // Filter exercises based on the selected term, subject, and search query
      const filteredExercises = data.filter(exercise =>
        (selectedTerm === 'all' || exercise.term === selectedTerm) &&
        (selectedSubject === 'all' || exercise.subject === selectedSubject) &&
        (searchQuery === '' || exercise.title.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      // Update the document count
      totalDocuments = filteredExercises.length; // Updated this line
      documentCountElement.textContent = totalDocuments; // Updated this line

      // Generate exercise cards for the filtered exercises
      filteredExercises.forEach(exercise => {
        const cardHtml = `
          <div class="col-lg-4 mb-4">
            <div class="card animate__animated animate__fadeInLeft">
              <img src="${getSubjectImage(exercise.subject)}" class="card-img-top" alt="${exercise.subject}">
              <div class="card-body">
                <h5 class="card-title">${exercise.title}</h5>
                <p class="card-text">
                  <strong>الشعبة:</strong> ${exercise.term}<br>
                  <strong>المادة:</strong> ${exercise.subject}<br>
                  <strong>الناشر:</strong> ${exercise.author}
                </p>
                <a href="${exercise.link}" class="btn btn-primary" target="_blank">
                  قم بالتمرن
                  <i class="fas fa-dumbbell ml-2"></i>
                </a>
              </div>
            </div>
          </div>
        `;

        exerciseCardsContainer.innerHTML += cardHtml;
      });
    }

    // Populate the subject dropdown with unique subjects from the data
    const uniqueSubjects = [...new Set(data.map(exercise => exercise.subject))];
    uniqueSubjects.forEach(subject => {
      const option = document.createElement('option');
      option.value = subject;
      option.text = subject;
      subjectSelect.add(option);
    });

    // Add event listener for the search button
    searchButton.addEventListener('click', function () {
      const selectedTerm = termSelect.value;
      const selectedSubject = subjectSelect.value;
      const searchQuery = searchInput.value.trim();
      filterExercises(selectedTerm, selectedSubject, searchQuery);
    });

    // Add event listeners to dynamically update exercise cards based on the selected term and subject
    termSelect.addEventListener('change', function () {
      const selectedTerm = this.value;
      const selectedSubject = subjectSelect.value;
      const searchQuery = searchInput.value.trim();
      filterExercises(selectedTerm, selectedSubject, searchQuery);
    });

    subjectSelect.addEventListener('change', function () {
      const selectedTerm = termSelect.value;
      const selectedSubject = this.value;
      const searchQuery = searchInput.value.trim();
      filterExercises(selectedTerm, selectedSubject, searchQuery);
    });

    // Initially load exercise cards with all exercises
    filterExercises('all', 'all', '');
  })
  .catch(error => console.error('Error fetching data:', error));

// Function to get the image URL for each subject
function getSubjectImage(subject) {
  switch (subject) {
    case 'فلسفة':
      return 'https://untitled-master.github.io/Circle/Backend/images/philo.jpg';
    case 'علوم اسلامية':
      return 'https://untitled-master.github.io/Circle/Backend/images/is.jpg'; // Replace with the actual URL
    case 'اجتماعيات':
      return 'https://untitled-master.github.io/Circle/Backend/images/gah.jpg'; // Replace with the actual URL
    case 'اللغة العربية و ادابها':
      return 'https://untitled-master.github.io/Circle/Backend/images/ar.jpg'; // Replace with the actual URL
    case 'اللغة الفرنسية':
      return 'https://untitled-master.github.io/Circle/Backend/images/fr.jpg'; // Replace with the actual URL
    case 'اللغة الانجليزية':
      return 'https://untitled-master.github.io/Circle/Backend/images/en.jpg'; // Replace with the actual URL
    case 'الفيزياء':
      return 'https://untitled-master.github.io/Circle/Backend/images/physics.jpg'; // Replace with the actual URL
    case 'العلوم التجريبية و الحياة':
      return 'https://untitled-master.github.io/Circle/Backend/images/science.jpg'; // Replace with the actual URL
    case 'الرياضيات':
      return 'https://untitled-master.github.io/Circle/Backend/images/math.jpg'; // Replace with the actual URL
    default:
      return 'https://images.unsplash.com/photo-1682686581740-2c5f76eb86d1?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; // Replace with a default image URL
  }
}
});
