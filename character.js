var character = {
	_initiativeModifier: 0,
	getInitiativeModifer: function() {
		return this._initiativeModifier;
	},
	setInitiativeModifier: function(newInitiativeModifier) {
		this._initiativeModifier = newInitiativeModifier;
		console.log("Modifier set to " + newInitiativeModifier);
	},
	
	_initiative: 0,
	getInitiative: function() {
		return this._initiative;
	},
	setInitiative: function(newInitiative) {
		this._initiative = newInitiative;
	}
	
// 	addGrade: function(newGrade) {
// 		this._grades.push(newGrade);
// 	},
	
// 	getCountOfGrades: function() {
// 		return this._grades.length;
// 	},
	
// 	getAverage: function() {
// 		var total = 0;
// 		for(var i = 0; i < this._grades.length;i++) {
// 			total += this._grades[i];
// 		}
//     console.log("HERE");
// 		return total/(this._grades.length);
// 	},
	
// 	reset: function() {
// 		this._grades = [];
// 	},
	
// 	getLetterGrade: function() {
// 		var score = this.getAverage();
// 		if(score >= 90) return 'A';
// 		else if(score >= 80) return 'B';
// 		else if(score >= 70) return 'C';
// 		else if(score >= 60) return 'D';
// 		return 'F';
// 	}
};

exports.char = character;
