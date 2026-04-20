from app.models.user_state import UserState


class UserStateService:
    def __init__(self, session):
        self.session = session

    def haal_op(self):
        return UserState(
            favorieten=self.session.get("favorieten", []),
            checklist=self.session.get("checklist", {}),
            opleiding=self.session.get("opleiding", ""),
        )
