from dataclasses import dataclass, field


@dataclass
class UserState:
    favorieten: list = field(default_factory=list)
    checklist: dict = field(default_factory=dict)
    opleiding: str = ""
    naam: str = ""

    def heeft_favorieten(self):
        return len(self.favorieten) > 0

    def checklist_voltooid(self):
        if not self.checklist:
            return 0
        aangevinkt = sum(1 for v in self.checklist.values() if v)
        return round(aangevinkt / len(self.checklist) * 100)
