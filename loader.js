<script type="text/javascript">

var onload = function() { 
	console.log("Loading Delve Data..");
	
	jQuery.ajax({
		url: "https://demromec.sharepoint.com/_api/search/query?Querytext='*'&Properties='GraphQuery:ACTOR(ME\\,action\\:1021),GraphRankingModel:{%22features%22\\:[{%22function%22\\:%22EdgeTime%22}]}'&&RankingModelId='0c77ded8-c3ef-466d-929d-905670ea1d72'&RowLimit=6&SelectProperties='ViewCountLifetime,Path,DisplayAuthor,FileExtension,Title,ModifiedBy,ServerRedirectedURL,ServerRedirectedPreviewURL,siteId,webId,uniqueId'",
		method: "GET",
		headers: { "Accept": "application/json; odata=verbose" },
		success: function(data) {
			var results = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;

			jQuery(results).each(function(i, e) {
				/**Get Data**/0
				var modifiedBy = jQuery.grep(e.Cells.results, function(n,i) { return n.Key == "ModifiedBy"})[0].Value;
				var title = jQuery.grep(e.Cells.results, function(n,i) { return n.Key == "Title"})[0].Value;
				var serverRedirectedPreviewURL = jQuery.grep(e.Cells.results, function(n,i) { return n.Key == "ServerRedirectedPreviewURL"})[0].Value;
				var docId = jQuery.grep(e.Cells.results, function(n,i) { return n.Key == "DocId"})[0].Value;
				var siteId = jQuery.grep(e.Cells.results, function(n,i) { return n.Key == "siteId"})[0].Value;
				var webId = jQuery.grep(e.Cells.results, function(n,i) { return n.Key == "webId"})[0].Value;
				var uniqueID = jQuery.grep(e.Cells.results, function(n,i) { return n.Key == "uniqueId"})[0].Value;
			
				/**Prepare HTML**/
				var htmlContents = '<div style="overflow:auto"> \
										<img style="float:left;" src="'+_spPageContextInfo.siteAbsoluteUrl + '/_layouts/15/getpreview.ashx?guidFile='+ uniqueID + '&guidSite='+ siteId +'&guidWeb='+webId+'&docid='+docId+'" scrolling="no"></iframe> \
										Title: ' + title + '<br/> \
										Modified By: '+ modifiedBy + '<br/> \
									</div>';
			
				/*Append DOM**/
				jQuery("#delveContent").append(htmlContents);
			});
		}
	});
};

SP.SOD.registerSod("jquery", "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js");
SP.SOD.executeFunc("jquery", null, onload);
SP.SOD.executeOrDelayUntilScriptLoaded(onload, "jquery");

</script>

<div id="delveContent"/>