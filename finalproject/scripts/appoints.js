const CLIENT_ID = '741754842911-812fqnp7oh6smv6c0sm1bs3lpa5i8op2.apps.googleusercontent.com';
    const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

    function gapiInit() {
      gapi.load('client:auth2', () => {
        gapi.client.init({
          clientId: CLIENT_ID,
          scope: SCOPES
        });
      });
    }

    gapiInit();

    document.getElementById("appointmentForm").addEventListener("submit", async function(e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const date = document.getElementById("date").value;
      const time = document.getElementById("time").value;
      const service = document.getElementById("service").value;

      const startDateTime = new Date(`${date}T${time}`);
      const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // +1 hora

      await gapi.auth2.getAuthInstance().signIn();

      const event = {
        summary: `Cita: ${service}`,
        description: `Cliente: ${name}, Email: ${email}`,
        start: { dateTime: startDateTime.toISOString(), timeZone: 'America/La_Paz' },
        end: { dateTime: endDateTime.toISOString(), timeZone: 'America/La_Paz' }
      };

      const request = gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event
      });

      request.execute(event => {
        alert("¡Cita creada en tu Google Calendar!");
        console.log("Evento creado:", event);
      });
    });
