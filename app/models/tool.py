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
