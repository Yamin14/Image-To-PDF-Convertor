
$(document).ready(function(){

	//images array
	var imagesArray = [];

	//preview images
	$("#input").change(function(){

		//activate download button
		$("#dwnBtn").removeAttr("disabled");

		//get files
		const files = this.files;
		let count = 0;

		$.each(files, function(i, file) {
			if (file) {

				//image id
				imageNo = "imagePreview" + count;
				count++;
			
				//create new image
				var tempImg = $('<img />', {
				   id: imageNo,
				});
				$("#result").prepend(tempImg);;

				//new image id
				let temp = "#imagePreview" + i;
				

				//read image
				let reader = new FileReader();
				reader.onload = function (event) {
					$(temp)
					.attr("src", event.target.result);
					imagesArray.push(event.target.result);
				};
				reader.readAsDataURL(file);
			}
		});
	});

	//create pdf
	$("#dwnBtn").on("click", function(){
		var pdf = new jsPDF({
                     orientation: 'p',
                     unit: 'mm',
                     format: 'a4',
                     putOnlyUsedFonts:true
                     });

		$.each(imagesArray, function(index, imgData) {
			try {
				pdf.addImage(imgData, "jpg/png/jpeg", 0, 0, 200, 270);

				if (index != imagesArray.length - 1) { 
					pdf.addPage();
				}
			} catch (err) {}
		});

        pdf.save('jsPDF_2Pages.pdf');

	})

});