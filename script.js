const sunIcon = document.querySelector('.sun-icon');

sunIcon.classList.add('rotate');

sunIcon.addEventListener('mouseover', () => {
  sunIcon.classList.remove('rotate');
});

sunIcon.addEventListener('mouseout', () => {
  sunIcon.classList.add('rotate');
});

// checkbox-section

const checkBoxes = document.querySelectorAll('.checkbox');
const inputFields = document.querySelectorAll('.goal-input');
const progressBar = document.querySelector('.progress-bar');
const progressValue = document.querySelector('.progress-value');
const para =document.querySelector('.para');

const allQuotes = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D'
]

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
    first: {
        name: '',
        completed: false
    },
    second: {
        name: '',
        completed: false
    },
    third: {
        name: '',
        completed: false
    }
};

let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length;

progressValue.style.width = `${(completedGoalsCount / 3) * 100}%`
progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`
para.innerText = allQuotes[completedGoalsCount];

checkBoxes.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
        const allGoalsAdded = [...inputFields].every(function (input) {
            return input.value;
        })
        
        if (allGoalsAdded) {
            checkbox.parentElement.classList.toggle("completed");
            const inputId = checkbox.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed

            completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
            
            progressValue.style.width = `${(completedGoalsCount / 3) * 100}%`

            progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`
            
            para.innerText = allQuotes[completedGoalsCount];

            localStorage.setItem('allGoals', JSON.stringify(allGoals));
        }
        else {
            progressBar.classList.add('show-error');
        }
    })
})

inputFields.forEach((input) => {
    if (allGoals[input.id]) {
        input.value = allGoals[input.id].name

        if (allGoals[input.id].completed) {
            input.parentElement.classList.add('completed');
        }
    }

    input.addEventListener('focus', () => {
        progressBar.classList.remove('show-error');
    })

    input.addEventListener('input', (e) => {
        if (allGoals[input.id] && allGoals[input.id].completed) {
            input.value = allGoals[input.id].name
            return
        }

        if (allGoals[input.id]) {
            allGoals[input.id].name = input.value
            }   
            else {
                allGoals[input.id] = {
                    name: input.value,
                    completed: false
                }
            }
        localStorage.setItem('allGoals', JSON.stringify(allGoals));
    })
})