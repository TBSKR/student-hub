from dataclasses import dataclass


@dataclass
class Tool:
    id: str
    name: str
    category: str
    icon: str
    what: str
    when: str
    whatExtended: str
    gettingStarted: list
    tips: list
    relatedTools: list
    platform: list
    required: bool = False
    week1: bool = False
    recommended: bool = False
    openUrl: str = "#"
    guideUrl: str = "#"
    favoriet: bool = False
    socialProof: str = ""

    @property
    def omschrijving(self):
        return self.whatExtended or self.what

    def heeft_gerelateerde_tools(self):
        return bool(self.relatedTools)
