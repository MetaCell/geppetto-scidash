import html2canvas from 'html2canvas';

export default class ScreenShotHelper {
	
    toggleLastColumnVisibility(mode){
    	var col;
    	var tbl = document.getElementsByClassName("scidash-tilted-titles-table")[0];
    	if (tbl != null) {
    		col = tbl.getElementsByTagName("tr")[1].getElementsByTagName("td").length-1;

    		if (col < 0 || col >= tbl.getElementsByTagName("td").length) {
    			return;
    		}

    		for (var i = 0; i < tbl.rows.length; i++) {
    			for (var j = 0; j < tbl.rows[i].cells.length; j++) {
    				if(tbl.rows[i].cells[j].getElementsByTagName("i").length>0){
    					tbl.rows[i].cells[j].style.display = "";
    					if (j == col){
    						tbl.rows[i].cells[j].style.display = mode? "":"none";
    					}
    				}
    			}
    		}
    	}
    }
    
    takeScreenshot(e,title, toggleColumn){
    	e.preventDefault();
    	var table = document.querySelector("#table-container-div");
    	var self = this;
    	if(table!=null){
    		if(toggleColumn){
    			this.toggleLastColumnVisibility(false);
    		}
        	html2canvas(table).then(function(canvas) {
        		var a = document.createElement('a');
        		// toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
        		a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        		a.download = title+'.png';
        		a.click();
        		if(toggleColumn){
        			self.toggleLastColumnVisibility(true);
        		}
        	});
    	}
    }
}