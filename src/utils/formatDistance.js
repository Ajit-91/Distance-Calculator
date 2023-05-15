// function to format the distance in meters to kilometers such that a comma is added after every 3 digits
const formatDistance = (distance) => {
    if (distance < 1000) {
        return Math.round(distance) + ' m';
      } else {
        const km = Math.round(distance / 1000);
        let str = km.toLocaleString("en-US", { maximumFractionDigits: 2 });
        
        return str.split(".")[0] + ' Kms';
      }
}

export default formatDistance;