export const getFullAddress = ({ address, floor, apartment }) => {
  const streetPt = `${address}, `
  const floorPt = floor ? `${floor} этаж, ` : ''
  const apartmentPt = `квартира ${apartment}`

  return streetPt + floorPt + apartmentPt
}
