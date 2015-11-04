	// live add to basket *!*!(this needs some work)
	$('.js-basket--add').each(function(){
		$(this).attr('data-qty', '0');	
	});
	// add to basket click and quantity toggle
	$('.js-basket--add').click(function(e){
		e.preventDefault();
		//alert('add to basket button');
		i = $(this).closest('.grid__item').index();
		var dataQty = parseInt($(this).attr('data-qty'));
		console.log(dataQty + ' clicked on add to basket parent   index=' + i);		


		if ( dataQty < 1 && !$(this).children('.qty-button--minus').length ) {
			// add div positioned over button with +/- links
			$(this).append('<span class="qty-button--minus">-</span><span class="qty-button--plus">+</span>');
			
			dataQty = dataQty + 1;
			//console.log(dataQty);
			$(this).attr('data-qty', dataQty);
			
			// add qty counter positioned in top right of product box
			$(this).parent().prepend('<span class="basket__count">' + dataQty + '</span>');
			// --
			console.log('clicked on add to basket');

		}
		else if ( dataQty === 0 & $(this).children('.qty-button--minus').length ) {
			dataQty = 0;
			$(this).attr('data-qty', dataQty);
			
			$(this).parent().find('.basket__count').remove();
			$(this).find('.qty-button--plus').remove();
			$(this).find('.qty-button--minus').remove();
						// --
			//console.log('down to zero' + '.  dataQty:'+ dataQty);
		}

		$('.qty-button--plus').click(function(){
			console.log(dataQty);
			dataQty ++;
				$(this).parent().attr('data-qty', dataQty);
				$(this).parent().parent().find('span.basket__count').text(dataQty);
						// --
			//console.log('add one' + '.  dataQty:'+ dataQty);
			//dataQty = undefined;
		});
		$('.qty-button--minus').click(function(){
			dataQty --;
				$(this).parent().attr('data-qty', dataQty);
				$(this).parent().parent().find('span.basket__count').text(dataQty);
						// --
			//console.log('remove one' + '.  dataQty:'+ dataQty);
			//dataQty = undefined;
		});
		// remove both when qty ==== 0
	});