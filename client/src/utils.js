// utils.js

export function calculateBMI(weight, height) {
    let height1 = height / 100;
    const bmi = weight / (height1 * height1);
    const roundedBMI = bmi.toFixed(2);
    return roundedBMI;
}

export const calculateExerciseDays = (weight, height) => {
    const bmi = weight / ((height / 100) ** 2);
    let recommendedDays;

    if (bmi < 18.5) { // Underweight
        recommendedDays = 3;
    } else if (bmi >= 18.5 && bmi < 22.9) { // Normal weight
        recommendedDays = 4;
    } else if (bmi >= 22.9 && bmi < 29.9) { // Overweight
        recommendedDays = 5;
    } else if (bmi >= 30) { // Obesity
        recommendedDays = 6;
    } else { // Default
        recommendedDays = 3;
    }
    return recommendedDays;
    
};

export const calculateDailyNeeds = (weight, height, age, sex, activityLevel) => {
    // Calculate Basal Metabolic Rate (BMR)
    let bmr;
    if (sex === "male") {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else if (sex === "female") {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    } else {
      throw new Error("Invalid sex input. Expected 'male' or 'female'.");
    }
    

    // Calculate Total Daily Energy Expenditure (TDEE) based on activity level
    let tdee;
    switch (activityLevel) {
      case "sedentary":
        tdee = bmr * 1.2;
        break;
      case "lightly active":
        tdee = bmr * 1.375;
        break;
      case "moderately active":
        tdee = bmr * 1.55;
        break;
      case "very active":
        tdee = bmr * 1.725;
        break;
      default:
        throw new Error("Invalid activity level input. Expected 'sedentary', 'lightly active', 'moderately active', or 'very active'.");}
        const proteinNeeds = weight; // 1 gram per kilogram of body weight

        return tdee; 
        
};