/**
 * TODO Your code goes below here!
 * You may find the helper functions helpful.
 */

// Part 1: Fetch the student data
/**
 * Sends API request to fetch student data, then (optionally) filters students, then displays them on the page.
 * @param {*} searchMode true if trying to search for students by name/major/interests; false otherwise (i.e. resets and initial load)
 */
function fetchAndDisplayStudents(searchMode) {
	fetch("https://cs571.org/s23/hw3/api/students", {
	headers: {
		'X-CS571-ID': 'bid_81b3bf23169ffb1c0d94',
	  }
	})
    .then((response) => response.json())
    .then((data) => {
		// Part 1: display the array of 166 students
		console.log(data);
        
		// Part 2: Display student names (hard to read)
		//studentsHtml = buildStudentsHtml(data)
		//const studentsRow = document.getElementById("students");
		//studentsRow.innerHTML += `${studentsHtml}`;

		// filter students before display
		let remainingStudents = data;

		if (searchMode == true) {
			remainingStudents = null;
			let searchName = document.getElementById("search-name").value.toLowerCase().trim();
			let searchMajor = document.getElementById("search-major").value.toLowerCase().trim();
			let searchInterest = document.getElementById("search-interest").value.toLowerCase().trim();
			
			remainingStudents = data.filter(student => {
				let firstName = student.name.first.toLowerCase();
				let lastName = student.name.last.toLowerCase();
				let fullName = firstName.concat(" ", lastName)
				
				if ((fullName.includes(searchName) || searchName.length === 0) && 
				   ((student.major.toLowerCase().includes(searchMajor) || searchMajor.length === 0)) &&
				   ((student.interests.some(interest => interest.toLowerCase().includes(searchInterest))) || searchInterest.length === 0)) {
						return true;
					} else {
						return false;
					}
			});
		}
		
		// Part 3: Display student names using Bootstrap
		// xs device = 1 col
		// sm device = 2 col
		// md device = 3 col
		// lg device = 4 col
		// xl device = 6 col
		
		const studentsRow = document.getElementById("students");
		studentsRow.innerHTML = ""
		for (let student of remainingStudents) {
			studentsRow.innerHTML += `<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">${buildStudentHtml(student)}</div>`;
		}		
    })
}

// Initially, load in all students
fetchAndDisplayStudents(false)

// When search button is clicked, load in only specific students
document.getElementById("search-btn").addEventListener("click", () => {
	fetchAndDisplayStudents(true);
});

// When reset search button is clicked, clear all search fields and re-display students
document.getElementById("reset-search-btn").addEventListener("click", () => {
	document.getElementById("search-name").value = "";
	document.getElementById("search-major").value = "";
	document.getElementById("search-interest").value = "";
	fetchAndDisplayStudents(false);
});

/**
 * Given the array of student interests, creates a string representing a HTML unordered list
 * @param {*} interests the array of student interests
 * @returns a string corresponding to an HTML unordered list
 */
function createInterestList(interests) {
	let ul = "<ul>";
	interests.forEach(interest => {
		ul += "<li>";
		ul += interest;
		ul += "</li>";
	});
	ul += "</ul>";
	return ul;
}


/**
 * Given an array of students, generates HTML for all students
 * using {@link buildStudentHtml}.
 * 
 * @param {*} studs array of students
 * @returns html containing all students
 */
function buildStudentsHtml(studs) {
	return studs.map(stud => buildStudentHtml(stud)).join("\n");
}

/**
 * Given a student object, generates HTML. Use innerHtml to insert this
 * into the DOM, we will talk about security considerations soon!
 * 
 * @param {*} stud 
 * @returns 
 */
function buildStudentHtml(stud) {
	let html = `<div>`;
	html += `<h2>${stud.name.first} ${stud.name.last}</h2>`;
	html += `<h5>${stud.major}</h5>`;
	html += `<p>${stud.name.first} is taking ${stud.numCredits} credits and ${stud.fromWisconsin == true ? 'is' : 'is <strong>not</strong>'} from Wisconsin.</p>`;
	html += `<p>They have ${stud.interests.length} interests, including:</p>`;
	html += `${createInterestList(stud.interests)}`
	html += `</div>`
	return html;
}
