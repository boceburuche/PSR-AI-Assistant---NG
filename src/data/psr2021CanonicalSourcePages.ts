/** Canonical PDF positions in the Library's 157-page PSR 2021 edition.
 * The original image files are downloaded from the NIMR-hosted 157-page
 * copy, checked against the uploaded Library master.
 *
 * CAUTION: PDF positions 54/55 are in unusual order in the master scan.
 * Do not infer positions by adding a constant to older transcript leaves.
 */
export const PSR2021_CH3_SOURCE_PAGES: Record<string, number[]> = {
  '030101':[51], '030102':[51], '030103':[51],
  '030104':[52], '030105':[52], '030106':[52],
  '030107':[52], '030108':[52], '030109':[52],
  '030201':[52], '030202':[52,53],
  '030301':[55], '030302':[54,55],
  '030401':[54], '030501':[54], '030502':[54], '030601':[54]
};
export const PSR2021_CH5_SOURCE_PAGES: Record<string, number[]> = {
  '050101':[59], '050102':[59], '050103':[59], '050104':[59],
  '050201':[60], '050202':[60], '050203':[60], '050204':[60],
  '050205':[60], '050206':[60], '050207':[60,61],
  '050301':[61], '050401':[61], '050402':[61,62],
  '050403':[62], '050404':[62], '050405':[63],
  '050406':[63,64], '050501':[64], '050601':[64],
  '050701':[65], '050702':[65], '050703':[65]
};
export function psr2021PageImageUrl(chapter:3|5, page:number):string {
  return `${import.meta.env.BASE_URL}psr2021/chapter${chapter}/page-${page}.png`;
}
export function psr2021PageLinks(chapter:3|5, pages:readonly number[]):string {
  return pages.map(page=>`[original PDF page ${page}](${psr2021PageImageUrl(chapter,page)})`).join(', ');
}
